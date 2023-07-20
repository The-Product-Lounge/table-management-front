"use client";
import dynamic from "next/dynamic";

const Form = dynamic(
  () => {
    return import("@/old/views/Form").then((module) => module.Form);
  },
  {
    ssr: false,
  }
);

export default function Page({ params }: { params: { eventId: string } }) {
  return (
    <>
      <Form eventId={params.eventId} />
    </>
  );
}
