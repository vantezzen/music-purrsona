"use client";
import React from "react";
import Stepper from "../ui/stepper";
import { Image, ListMusic, PawPrint, UserCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import ImageStep from "./steps/ImageStep";
import DetectPet from "./steps/DetectPet";
import Purrsona from "@/lib/Purrsona";
import ConfirmPetType from "./steps/ConfirmPetType";
import { Step, useAppState } from "./appState";

function App() {
  const imageInput = React.useRef<HTMLInputElement>(null);

  const purrsona = useAppState((state) => state.purrsona);

  const step = useAppState((state) => state.step);
  const setStep = useAppState((state) => state.setStep);

  const setProgress = useAppState((state) => state.setProgress);
  const progress = useAppState((state) => state.progress);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card>
        <CardContent className="p-10 w-[600px]">
          <Stepper
            steps={[UserCircle2, Image, PawPrint, ListMusic]}
            progress={progress}
          />

          <div className="h-8" />

          {step === Step.Image && <ImageStep />}
          {step === Step.DetectPet && <DetectPet />}
          {step === Step.ConfirmPetType && (
            <ConfirmPetType onContinue={() => {}} />
          )}

          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            name="image"
            id="image"
            ref={imageInput}
            onChange={(e) => {
              if (e.target.files) {
                setStep(Step.DetectPet);
                setProgress(2);
                purrsona.detectPet(e.target).then(() => {
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

export default App;
