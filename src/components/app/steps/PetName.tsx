"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useAppState } from "../appState";

function PetName({ onContinue }: { onContinue: () => void }) {
  const petName = useAppState((state) => state.petName);
  const setPetName = useAppState((state) => state.setPetName);

  return (
    <div>
      <h1 className="font-bold text-lg mb-3">What's your pet's name?</h1>
      <p className="text-gray-400 text-sm mb-6">
        What is your pet's name or nickname? We will use this to personalize
        your playlist.
      </p>

      <Input
        placeholder="Charlie"
        value={petName}
        onChange={(e) => setPetName(e.target.value)}
        className="bg-white"
        autoFocus
      />

      <Button onClick={onContinue} className="w-full mt-6" disabled={!petName}>
        Continue
      </Button>
    </div>
  );
}

export default PetName;
