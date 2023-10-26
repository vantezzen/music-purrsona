"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useAppState } from "../appState";
import Projects from "@/components/other/Projects";

function PlaylistCreated() {
  const petName = useAppState((state) => state.petName);
  const playlistUrl = useAppState((state) => state.playlistUrl);
  const cover = useAppState((state) => state.cover);

  return (
    <div>
      <a href={playlistUrl} target="_blank" rel="noreferrer">
        <img
          src={cover}
          alt="Cover"
          className="w-64 rounded-lg mb-6 mx-auto shadow-xl"
        />
      </a>

      <h1 className="font-bold text-lg mb-3">
        Here's your playlist for {petName}!
      </h1>
      <p className="text-gray-400 text-sm">
        We've created a playlist for {petName} based on their and your
        personality. Enjoy!
      </p>

      <div className="h-8" />

      <div className="flex justify-center">
        <Button asChild className="w-full">
          <a href={playlistUrl} target="_blank" rel="noreferrer">
            Open Spotify
          </a>
        </Button>
      </div>

      <Projects />
    </div>
  );
}

export default PlaylistCreated;
