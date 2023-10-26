"use client";
import Purrsona from "@/lib/Purrsona";
import useSessionToken from "@/lib/hooks/useSessionToken";
import { useAppState } from "./appState";
import { useEffect } from "react";
import LoadingScreen from "../LoadingScreen";
import AppContents from "./AppContents";

function App() {
  const spotifyToken = useSessionToken();
  const purrsona = useAppState((state) => state.purrsona);
  const setPurrsona = useAppState((state) => state.setPurrsona);

  useEffect(() => {
    if (spotifyToken) {
      setPurrsona(new Purrsona(spotifyToken));
    }
  }, [spotifyToken]);

  if (!purrsona) return <LoadingScreen />;
  return <AppContents />;
}

export default App;
