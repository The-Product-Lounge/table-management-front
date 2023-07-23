"use client";
import dynamic from "next/dynamic";

const EventSettings = dynamic(
  () => {
    return import("@/old/views/EventSettings").then(
      (module) => module.EventSettings
    );
  },
  {
    ssr: false,
  }
);

export default function Page({ params }: { params: { eventId: string } }) {
  return (
    <>
      <EventSettings eventId={params.eventId} />
    </>
  );
}
