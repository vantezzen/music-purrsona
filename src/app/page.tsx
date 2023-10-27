import Faq from "@/components/landing/Faq";
import Hero from "@/components/landing/Hero";
import Steps from "@/components/landing/Steps";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Hero />
      <Steps />
      <Faq />

      <div className="flex justify-center my-10">
        <Button asChild size="lg">
          <Link href="/app">Connect with Spotify</Link>
        </Button>
      </div>
    </main>
  );
}
