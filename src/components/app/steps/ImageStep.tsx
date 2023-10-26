"use client";
import { Button } from "@/components/ui/button";
import React from "react";

function ImageStep() {
  return (
    <div>
      <h1 className="font-bold text-lg mb-3">
        Let's start with an image of your pet
      </h1>
      <p className="text-gray-400 text-sm">
        Take a quick picture of your pet or upload one from your gallery. We
        will use this image to determine your pet's personality and music taste.
        <br />
        <br />
        Make sure your whole pet is in the picture and that the image is not
        blurry.
      </p>

      <div className="h-8" />

      <div className="flex justify-center">
        <Button asChild>
          <label htmlFor="image">Take a picture</label>
        </Button>
      </div>
    </div>
  );
}

export default ImageStep;
