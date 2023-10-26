import { PetType } from "@/lib/PetDetector";
import Purrsona from "@/lib/Purrsona";
import { create } from "zustand";

export enum Step {
  Image,
  DetectPet,
  ConfirmPetType,
  PetName,
  CreatePlaylist,
  PlaylistCreated,
}

export interface AppState {
  purrsona: Purrsona;
  setPurrsona: (purrsona: Purrsona) => void;
  petType: PetType | null;

  petName?: string;
  setPetName: (petName: string) => void;

  step: Step;
  setStep: (step: Step) => void;

  progress: number;
  setProgress: (progress: number) => void;

  playlistUrl?: string;
  cover?: string;
}

export const useAppState = create<AppState>((set) => ({
  // @ts-ignore
  purrsona: null,

  setPurrsona: (purrsona) => set({ purrsona }),
  petType: null,

  petName: undefined,
  setPetName: (petName) => set({ petName }),

  step: Step.Image,
  setStep: (step) => set({ step }),

  progress: 1,
  setProgress: (progress) => set({ progress }),

  playlistUrl: undefined,
  cover: undefined,
}));
