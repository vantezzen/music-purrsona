import { TargetMusicFeatures } from "@/lib/types";
import React from "react";
import { Progress } from "../ui/progress";
import { uppercaseFirst } from "@/lib/utils";

const featureRanges = {
  acousticness: [0, 1],
  danceability: [0, 1],
  energy: [0, 1],
  instrumentalness: [0, 1],
  liveness: [0, 1],
  loudness: [-60, 0],
  speechiness: [0, 1],
  tempo: [0, 200],
  valence: [0, 1],
};

function FeatureStatus({
  featureName,
  featureValue,
}: {
  featureName: string;
  featureValue: number;
}) {
  const [min, max] = featureRanges[featureName as keyof typeof featureRanges];
  const percentage = ((featureValue - min) / (max - min)) * 100;
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="font-bold text-xs">{uppercaseFirst(featureName)}</div>

      <Progress
        value={percentage}
        indicatorClassName="animate-width"
        className="h-1"
      />
    </div>
  );
}

function FeaturesDisplay({ features }: { features: TargetMusicFeatures }) {
  return (
    <div className="grid gap-2 max-w-md mx-auto">
      {Object.entries(features).map(([featureName, featureValue]) => (
        <FeatureStatus
          featureName={featureName}
          featureValue={featureValue}
          key={featureName}
        />
      ))}
    </div>
  );
}

export default FeaturesDisplay;
