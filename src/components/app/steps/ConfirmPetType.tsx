import Purrsona from "@/lib/Purrsona";
import React from "react";
import { useAppState } from "../appState";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ConfirmPetType({ onContinue }: { onContinue: () => void }) {
  const petType = useAppState((state) => state.petType);

  return (
    <div>
      <h1 className="font-bold text-lg mb-3">
        Is your pet a{" "}
        <span className="text-purple-700">
          {petType?.breed} {petType?.type}
        </span>{" "}
        or similar to one?
      </h1>
      <p className="text-gray-400 text-sm">
        What a cute pet you have! We think your pet is a{" "}
        <span className="text-purple-700">
          {petType?.breed} {petType?.type}
        </span>{" "}
        but we want to make sure.
      </p>

      <div className="flex gap-3 mt-8">
        <Button className="w-full" onClick={onContinue}>
          <Check size="1rem" />
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" variant="destructive">
              <X size="1rem" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>We're so sorry for that!</DialogTitle>
            </DialogHeader>

            <p className="text-gray-400 text-sm">
              It looks like John misidentified your pet. This is absolutely
              unacceptable and we will be firing him immediately!
            </p>

            <DialogFooter>
              <Button
                onClick={() => {
                  onContinue();
                }}
              >
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button className="w-full" variant="secondary" onClick={onContinue}>
          I don't know
        </Button>
      </div>
    </div>
  );
}

export default ConfirmPetType;
