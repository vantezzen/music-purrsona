import { useAppState } from "@/components/app/appState";
import PetDetector, { PetType } from "./PetDetector";
import debugging from "debug";
const debug = debugging("app:Purrsona");

export default class Purrsona {
  private petDetector = new PetDetector();

  constructor() {
    debug("Purrsona constructor");
  }

  public async detectPet(inputElement: HTMLInputElement) {
    debug("Detecting pet");

    const petType = await this.petDetector.predict(inputElement);
    debug("Detected pet", petType);

    useAppState.setState({ petType });
  }
}
