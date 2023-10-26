import { create } from "zustand";

export interface AuthGateState {
  needsReauth: boolean;
  setNeedsReauth: (needsReauth: boolean) => void;
}

export const useAuthGateState = create<AuthGateState>((set) => ({
  needsReauth: false,
  setNeedsReauth: (needsReauth) => set({ needsReauth }),
}));
