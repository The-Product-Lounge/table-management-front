"use client";
import dynamic from "next/dynamic";

const OldEventView = dynamic(
  () => {
    return import("../../old/views/EventsView").then(
      (module) => module.EventsView
    );
  },
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <>
      <OldEventView />
    </>
  );
}
