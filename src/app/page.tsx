import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Button asChild>
        <Link href="/app">Start now</Link>
      </Button>
    </main>
  );
}
