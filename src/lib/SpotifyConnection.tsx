import SpotifyWebApi from "spotify-web-api-node";
import debugging from "debug";
import { fetchSpotifyWithLimitHandling } from "./fetchSpotifyWithLimitHandling";
import { round } from "./utils";
import { useAuthGateState } from "@/components/auth/authGateState";
import { TargetMusicFeatures, Track } from "./types";
const debug = debugging("app:player:SpotifyPlayer");

export default class SpotifyConnection {
  private spotify: SpotifyWebApi;

  constructor(private token: string) {
    debug("SpotifyPlayer constructor");
    this.spotify = this.getAuthenticatedSpotifyClient();
  }

  private getAuthenticatedSpotifyClient() {
    const spotify = new SpotifyWebApi();
    spotify.setAccessToken(this.token);
    return spotify;
  }

  private async createPlaylistForTargetFeatures(
    targetFeatures: TargetMusicFeatures,
    petName: string
  ) {
    const ownName = await this.getDisplayName();
    const playlistName = `${petName} and ${ownName}'s Playlist`;

    const playlist = await this.spotify.createPlaylist(playlistName, {
      public: false,
    });

    const tracks = await this.getTracksFittingTargetFeatures(targetFeatures);
    const trackIds = tracks.map((t) => t.id);

    const trackIdsChunks = [];
    const chunkSize = 100;
    for (let i = 0; i < trackIds.length; i += chunkSize) {
      trackIdsChunks.push(trackIds.slice(i, i + chunkSize));
    }

    for (const trackIdsChunk of trackIdsChunks) {
      await this.spotify.addTracksToPlaylist(playlist.body.id, trackIdsChunk);
    }

    return playlist.body.external_urls.spotify;
  }

  private async getTracksFittingTargetFeatures(
    features: TargetMusicFeatures,
    amount = 100
  ) {
    const possibleTracks = await this.getPossibleTracks();

    const tracksWithDistance = possibleTracks.map((track) => {
      const distance = Math.sqrt(
        Object.entries(features).reduce(
          (sum, [featureName, featureValue]) =>
            sum +
            Math.pow(
              featureValue -
                track.audioFeatures[featureName as keyof TargetMusicFeatures],
              2
            ),
          0
        )
      );
      return { track, distance };
    });

    const tracksFittingTargetFeatures = tracksWithDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, amount)
      .map((t) => t.track);

    return tracksFittingTargetFeatures;
  }

  private async getPossibleTracks() {
    const recentlyPlayedTracks = await this.getRecentlyPlayedTracks();
    const topTracks = await this.getTopTracks();
    return [...recentlyPlayedTracks, ...topTracks];
  }

  private async getRecentlyPlayedTracks(amount = 2000) {
    let nextPageUrl =
      "https://api.spotify.com/v1/me/player/recently-played?limit=50";
    let tracks: SpotifyApi.TrackObjectFull[] = [];
    type ResponseType = SpotifyApi.UsersRecentlyPlayedTracksResponse;

    while (tracks.length < amount) {
      const recentlyPlayedTracks =
        await fetchSpotifyWithLimitHandling<ResponseType>(async () => {
          return (await (
            await fetch(nextPageUrl, {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            })
          ).json()) as ResponseType;
        });

      tracks = [
        ...tracks,
        ...recentlyPlayedTracks.items.map((item) => item.track),
      ];

      if (recentlyPlayedTracks.next) {
        nextPageUrl = recentlyPlayedTracks.next;
      } else {
        break;
      }
    }

    return await this.getTrackList(
      tracks.slice(0, Math.min(tracks.length, amount))
    );
  }

  private async getTopTracks(amount = 500) {
    const itemsPerPage = 50;
    const pages = Math.ceil(amount / itemsPerPage);

    let tracks: SpotifyApi.TrackObjectFull[] = [];

    for (let page = 0; page < pages; page++) {
      const response = await this.spotify
        .getMyTopTracks({
          limit: itemsPerPage,
          offset: page * itemsPerPage,
        })
        .catch((e) => {
          if (e.message.includes("The access token expired")) {
            useAuthGateState.setState({ needsReauth: true });
          }
          throw e;
        });
      tracks = [...tracks, ...response.body.items];
    }

    return await this.getTrackList(
      tracks.slice(0, Math.min(tracks.length, amount))
    );
  }

  private async getAudioFeaturesForTracks(
    tracks: SpotifyApi.TrackObjectFull[]
  ) {
    let audioFeatures: SpotifyApi.AudioFeaturesObject[] = [];
    let offset = 0;

    while (true) {
      const response = await this.spotify.getAudioFeaturesForTracks(
        tracks.slice(offset, offset + 100).map((t) => t.id)
      );
      audioFeatures = audioFeatures.concat(response.body.audio_features);
      offset += 100;

      if (offset >= tracks.length) {
        break;
      }
    }

    return audioFeatures;
  }

  public async getTrackList(tracks: SpotifyApi.TrackObjectFull[]) {
    const trackList: Map<string, Track> = new Map();
    const audioFeatures = await this.getAudioFeaturesForTracks(tracks);

    for (const track of tracks) {
      const trackId = track.id;
      if (!trackList.has(trackId)) {
        const audioFeature = audioFeatures.find((af) => af.id === trackId);
        trackList.set(trackId, {
          id: trackId,
          name: track.name,
          artists: track.artists.map((a) => a.name).join(", "),
          audioFeatures: audioFeature!,
        });
      }
    }

    return Array.from(trackList.values());
  }

  private async getDataForTrack(track: SpotifyApi.TrackObjectFull) {
    return await (
      await fetch(
        `/api/song?title=${encodeURIComponent(
          track.name
        )}&artists=${encodeURIComponent(
          track.artists.map((a) => a.name).join(", ")
        )}`
      )
    ).json();
  }

  public async getDisplayName() {
    const response = await this.spotify.getMe();
    return response.body.display_name;
  }
}
