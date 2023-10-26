import { useAppState } from "@/components/app/appState";
import PetDetector, { PetType } from "./PetDetector";
import debugging from "debug";
import SpotifyConnection from "./SpotifyConnection";
import targetFeatures from "@/data/targetFeatures.json";
const debug = debugging("app:Purrsona");

export default class Purrsona {
  private petDetector = new PetDetector();
  private spotify: SpotifyConnection;

  constructor(spotifyToken: string) {
    debug("Purrsona constructor");

    this.spotify = new SpotifyConnection(spotifyToken);
  }

  public async detectPet(inputElement: HTMLInputElement) {
    debug("Detecting pet");

    const petType = await this.petDetector.predict(inputElement);
    debug("Detected pet", petType);

    useAppState.setState({ petType });
  }

  public async createPlaylist() {
    debug("Creating playlist");

    const { petType } = useAppState.getState();
    if (!petType) {
      throw new Error("No pet detected");
    }

    const petName = "Pet";
    const petTargetFeatures =
      targetFeatures[
        `${petType.type}:${petType.breed}` as keyof typeof targetFeatures
      ];
    const playlistUrl = await this.spotify.createPlaylistForTargetFeatures(
      petTargetFeatures,
      petName
    );

    return { petName, playlistUrl };
  }
}
