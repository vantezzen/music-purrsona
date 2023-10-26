import { Loader2 } from "lucide-react";
import React from "react";

function LoadingScreen() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-background flex items-center justify-center">
      <Loader2
        className="animate-spin text-zinc-900 mx-auto mb-8"
        size="1.5rem"
      />
    </div>
  );
}

export default LoadingScreen;
