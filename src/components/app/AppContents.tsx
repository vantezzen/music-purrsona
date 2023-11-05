"use client";
import React from "react";
import Stepper from "../ui/stepper";
import { Image, ListMusic, PawPrint, UserCircle2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import ImageStep from "./steps/ImageStep";
import DetectPet from "./steps/DetectPet";
import ConfirmPetType from "./steps/ConfirmPetType";
import { Step, useAppState } from "./appState";
import CreatePlaylist from "./steps/CreatePlaylist";
import PetName from "./steps/PetName";
import PlaylistCreated from "./steps/PlaylistCreated";
import { trackEvent } from "@/lib/analytics";

function AppContents() {
  const imageInput = React.useRef<HTMLInputElement>(null);

  const purrsona = useAppState((state) => state.purrsona);

  const step = useAppState((state) => state.step);
  const setStep = useAppState((state) => state.setStep);

  const setProgress = useAppState((state) => state.setProgress);
  const progress = useAppState((state) => state.progress);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card>
        <CardContent className="p-10 w-[600px] max-w-[90vw]">
          <Stepper
            steps={[UserCircle2, Image, PawPrint, ListMusic]}
            progress={progress}
          />

          <div className="h-8" />

          {step === Step.Image && <ImageStep />}
          {step === Step.DetectPet && <DetectPet />}
          {step === Step.ConfirmPetType && (
            <ConfirmPetType
              onContinue={() => {
                setStep(Step.PetName);
              }}
            />
          )}
          {step === Step.PetName && (
            <PetName
              onContinue={() => {
                setStep(Step.CreatePlaylist);
                setProgress(3);
                trackEvent("creating_playlist");
                purrsona.createPlaylist(imageInput.current!).then(() => {
                  trackEvent("playlist_created");
                  setStep(Step.PlaylistCreated);
                });
              }}
            />
          )}
          {step === Step.CreatePlaylist && <CreatePlaylist />}
          {step === Step.PlaylistCreated && <PlaylistCreated />}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            name="image"
            id="image"
            ref={imageInput}
            onChange={(e) => {
              if (e.target.files) {
                setStep(Step.DetectPet);
                setProgress(2);
                trackEvent("image_uploaded");
                purrsona.detectPet(e.target).then(() => {
                  trackEvent("pet_detected");
                  setStep(Step.ConfirmPetType);
                });
              }
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default AppContents;
