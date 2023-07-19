"use client";
import dynamic from "next/dynamic";

const OldEventSettings = dynamic(
  () => {
    return import("@/old/views/EventSettings").then(
      (module) => module.EventSettings
    );
  },
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <>
      <OldEventSettings />
    </>
  );
}
