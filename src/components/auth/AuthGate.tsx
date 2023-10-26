import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useAuthGateState } from "./authGateState";
import { usePathname, useRouter } from "next/navigation";
import LoadingScreen from "../LoadingScreen";

function AuthGate({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const needsReauth = useAuthGateState((state) => state.needsReauth);
  const path = usePathname();
  const isUnauthenticatedPage =
    path.startsWith("/api") ||
    path.startsWith("/legal") ||
    path.startsWith("/_next") ||
    path === "/";

  useEffect(() => {
    if (status === "unauthenticated" && !isUnauthenticatedPage) {
      signIn("spotify");
    }
  }, [status, isUnauthenticatedPage]);

  useEffect(() => {
    if (needsReauth) {
      signOut().then(() => signIn("spotify"));
    }
  }, [needsReauth]);

  if (
    !isUnauthenticatedPage &&
    (["unauthenticated", "loading"].includes(status) || needsReauth)
  ) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}

export default AuthGate;
