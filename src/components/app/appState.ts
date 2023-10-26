import { PetType } from "@/lib/PetDetector";
import Purrsona from "@/lib/Purrsona";
import { create } from "zustand";

export enum Step {
  Image,
  DetectPet,
  ConfirmPetType,
}

export interface AppState {
  purrsona: Purrsona;
  setPurrsona: (purrsona: Purrsona) => void;
  petType: PetType | null;

  step: Step;
  setStep: (step: Step) => void;

  progress: number;
  setProgress: (progress: number) => void;
}

export const useAppState = create<AppState>((set) => ({
  purrsona: new Purrsona(),
  setPurrsona: (purrsona) => set({ purrsona }),
  petType: null,

  step: Step.Image,
  setStep: (step) => set({ step }),

  progress: 1,
  setProgress: (progress) => set({ progress }),
}));
