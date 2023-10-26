import { useSession } from "next-auth/react";

export default function useSessionToken() {
  const session = useSession();
  return (session.data as any)?.token;
}
