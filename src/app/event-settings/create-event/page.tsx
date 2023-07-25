"use client";
import dynamic from "next/dynamic";

const CreateEventModal = dynamic(
  () => {
    return import("@/old/components/events-view/CreateEventModal").then(
      (module) => module.CreateEventModal
    );
  },
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <>
      <CreateEventModal eventId={null} />
    </>
  );
}
