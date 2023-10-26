"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import AuthGate from "./auth/AuthGate";

function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthGate>{children}</AuthGate>
    </SessionProvider>
  );
}

export default RootProviders;
