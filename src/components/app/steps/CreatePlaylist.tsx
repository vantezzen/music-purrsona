"use client";
import { Button } from "@/components/ui/button";
import { Loader, Loader2 } from "lucide-react";
import React from "react";

function CreatePlaylist() {
  return (
    <div className="">
      <Loader2
        className="animate-spin text-zinc-500 mx-auto mb-8"
        size="1.5rem"
      />

      <h1 className="font-bold text-lg mb-3">Creating your playlist</h1>
      <p className="text-gray-400 text-sm">
        This may take a few seconds. We're creating a playlist based on your
        pet's personality.
      </p>
    </div>
  );
}

export default CreatePlaylist;
