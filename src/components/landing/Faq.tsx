"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    question: "How does Purrsona work?",
    answer: (
      <>
        Purrsona allows you to create a Spotify playlist based on your pet's
        personality. To do this, we use a machine learning model to detect your
        pet's breed and other information and then use it to predict your pet's
        music taste.
        <br />
        We'll then create a Spotify playlist based on your pet's predicted music
        taste and your own music taste and save it to your Spotify account - so
        you can listen to it anytime!
      </>
    ),
  },
  {
    question: "Is this safe? Is Purrsona legit?",
    answer: (
      <>
        Wrapped for TikTok is safe and privacy-centered. If you know how to read
        code, you can look at Purrsona's full source code at{" "}
        <a
          href="https://github.com/vantezzen/music-purrsona"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          https://github.com/vantezzen/music-purrsona
        </a>
        . Your Spotify and pet's data is only used in your browser and never
        uploaded to any server. We will not store or process your data on our
        server in any way.
      </>
    ),
  },
  {
    question: "What is this website for?",
    answer: (
      <>
        Spotify generates tons of personalized playlists for your - but none for
        your pet! Purrsona allows you to create a Spotify playlist based on your
        pet's personality.
      </>
    ),
  },
  {
    question: "How does the Spotify integration work?",
    answer: (
      <>
        Purrsona uses the Spotify Web API to create a playlist in your Spotify
        account. This requires you to connect your Spotify account to Purrsona
        and give us permission to create playlists in your account.
        <br />
        After clicking the "Connect with Spotify" button, you will be redirected
        to Spotify's website where you can connect your account. We only request
        the minimum permissions required to create a playlist in your account
        and to get your account's listening history.
        <br />
        After your playlist is done, feel free to revoke Purrsona's access to
        Spotify in your{" "}
        <a
          href="https://www.spotify.com/account/apps/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          Spotify account settings
        </a>
        .
      </>
    ),
  },
];

function Faq() {
  return (
    <Accordion
      type="single"
      collapsible
      className="max-w-lg dark mx-auto text-left"
    >
      {items.map((item) => (
        <AccordionItem value={item.question} key={item.question}>
          <AccordionTrigger className="text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default Faq;
