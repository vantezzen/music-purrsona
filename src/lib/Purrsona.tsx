import { useAppState } from "@/components/app/appState";
import PetDetector, { PetType } from "./PetDetector";
import debugging from "debug";
import SpotifyConnection from "./SpotifyConnection";
import targetFeatures from "@/data/targetFeatures.json";
import CoverCreator from "./CoverCreator";
const debug = debugging("app:Purrsona");

export default class Purrsona {
  private petDetector = new PetDetector();
  private spotify: SpotifyConnection;
  private coverCreator = new CoverCreator();

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

  public async createPlaylist(imageInput: HTMLInputElement) {
    debug("Creating playlist");

    const { petType } = useAppState.getState();
    if (!petType) {
      throw new Error("No pet detected");
    }

    const petName = useAppState.getState().petName!;
    const petTargetFeatures =
      targetFeatures[
        `${petType.type}:${petType.breed}` as keyof typeof targetFeatures
      ];

    await this.coverCreator.loadImageFromFile(imageInput);
    const cover = this.coverCreator.createCover(`${petName}`);

    useAppState.setState({ cover });

    const playlistUrl = await this.spotify.createPlaylistForTargetFeatures(
      petTargetFeatures,
      petName,
      cover
    );

    useAppState.setState({ playlistUrl });
  }
}
