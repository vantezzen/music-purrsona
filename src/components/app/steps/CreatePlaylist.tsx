"use client";
import { Button } from "@/components/ui/button";
import { Loader, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import FeaturesDisplay from "../FeaturesDisplay";
import { useAppState } from "../appState";
import {
  TransitionGroup,
  CSSTransition,
  SwitchTransition,
} from "react-transition-group";
import targetFeatures from "@/data/targetFeatures.json";

function CreatePlaylist() {
  const { type, breed } = useAppState((state) => state.petType) || {};
  const petTargetFeatures =
    targetFeatures[`${type}:${breed}` as keyof typeof targetFeatures] ||
    targetFeatures["Cat:Abyssinian"];
  const [phase, setPhase] = React.useState(0);

  useEffect(() => {
    let currentPhase = phase; // Can't use phase directly in the interval because it's a closure
    const interval = setInterval(() => {
      if (currentPhase >= 3) {
        clearInterval(interval);
        return;
      }
      setPhase((p) => p + 1);
      currentPhase++;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-6" />

      <SwitchTransition mode="out-in">
        <CSSTransition
          key={phase}
          classNames="fade"
          addEndListener={(node, done) =>
            node.addEventListener("transitionend", done, false)
          }
        >
          <div>
            {phase === 0 && (
              <>
                <h1 className="font-bold text-lg mb-3">
                  Creating your playlist
                </h1>
                <p className="text-gray-400 text-sm">
                  This may take a few seconds. We're creating a playlist based
                  on your pet's personality.
                </p>
              </>
            )}
            {phase === 1 && (
              <>
                <FeaturesDisplay features={petTargetFeatures} />
              </>
            )}
            {phase === 2 && (
              <h1 className="font-bold mb-3 text-center">
                Combining your pet's personality <br />
                with your music taste
              </h1>
            )}
            {phase >= 3 && (
              <h1 className="font-bold text-lg mb-3 text-center">
                Almost there...
              </h1>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

export default CreatePlaylist;
