import { LucideIcon } from "lucide-react";
import React, { FC } from "react";

interface StepperProps {
  steps: LucideIcon[];
  progress: number;
}

const Stepper: FC<StepperProps> = ({ steps, progress }) => {
  return (
    <div className="flex items-center justify-center">
      {steps.map((Icon, index) => (
        <React.Fragment key={index}>
          <div
            className={`relative flex items-center justify-center 
              text-white
            ${
              index < progress
                ? "bg-green-500"
                : index === progress
                ? "bg-purple-500"
                : "bg-zinc-800"
            } rounded-full w-10 h-10 aspect-square`}
          >
            <Icon size={18} />
          </div>

          {index < steps.length - 1 && (
            <div
              className={`w-16 h-1 
            ${index < progress ? "bg-green-500" : "bg-zinc-800"}
            `}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
