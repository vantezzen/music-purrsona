import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import debugging from "debug";
const debug = debugging("app:PetDetector");

export type PetType = {
  type: "Cat" | "Dog";
  breed: string;
};

export default class PetDetector {
  private model?: tmImage.CustomMobileNet;
  private modelLoadedCallbacks: (() => void)[] = [];

  constructor() {
    this.loadModel();
  }

  private async loadModel() {
    debug("Loading model");
    const modelUrl = "/assets/pet_model/";
    this.model = await tmImage.load(
      `${modelUrl}model.json`,
      `${modelUrl}metadata.json`
    );
    debug("Model loaded");

    this.modelLoadedCallbacks.forEach((cb) => cb());
  }

  public async predict(inputElement: HTMLInputElement): Promise<PetType> {
    if (!this.model) {
      debug("Waiting for model to load");
      await new Promise<void>((resolve) =>
        this.modelLoadedCallbacks.push(resolve)
      );
    }

    const imageElement = await this.getImageElementFromInput(inputElement);
    const prediction = await this.model!.predict(imageElement);
    debug("Got predictions", prediction);
    const predicted = prediction[0];
    const [type, breed] = predicted.className.split(":");

    return {
      type: type as PetType["type"],
      breed,
    };
  }

  private async getImageElementFromInput(
    input: HTMLInputElement
  ): Promise<HTMLImageElement> {
    const file = input.files?.[0];
    if (!file) {
      throw new Error("No file selected");
    }
    const imageElement = document.createElement("img");
    imageElement.src = URL.createObjectURL(file);
    await new Promise((resolve) => (imageElement.onload = resolve));
    return imageElement;
  }
}
