import Faq from "@/components/landing/Faq";
import Hero from "@/components/landing/Hero";
import Seo from "@/components/landing/Seo";
import Steps from "@/components/landing/Steps";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Hero />
      <Steps />
      <Faq />

      <div className="flex justify-center my-10">
        <Button asChild size="lg">
          <Link href="/app">Connect with Spotify</Link>
        </Button>
      </div>

      <Seo />
    </div>
  );
}
