import React from "react";
import logoIcon from "@/app/icon.png";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

function Hero() {
  return (
    <div className="flex flex-col gap-1 p-24 justify-center items-center min-h-[80vh] max-w-3xl mx-auto">
      <Image src={logoIcon} alt="logo" className="w-32 h-32 mb-10" />

      <h1 className="text-4xl md:text-5xl font-extrabold text-center leading-relaxed mb-10">
        Feline Groovy?
        <br />
        Find Your Pet's Tunes!
      </h1>

      <p className=" text-gray-600 font-medium mb-10">
        Ever pondered your feline's favorite song or your pup's preferred pop
        hit? With Purrsona, we blend the magic of your music taste with your
        pet's unique persona. Just upload a photo, and let our AI create a
        Spotify playlist that will have both of you tapping your paws
      </p>

      <Button asChild size="lg">
        <Link href="/app">Connect with Spotify</Link>
      </Button>

      <p className="text-zinc-500 text-sm mt-3">
        We don't store your data, and we'll never post to your account.
      </p>
      <p className="text-zinc-500 text-sm">
        By clicking this button, you agree to our{" "}
        <Link href="/legal/terms">Terms of Service</Link> and{" "}
        <Link href="/legal/privacy">Privacy Policy</Link>.
      </p>
    </div>
  );
}

export default Hero;
