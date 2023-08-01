import EventPreview from "@/old/assets/imgs/event-preview.png";
import CreateEvent from "@/old/assets/imgs/create-event.svg";

import Image from "next/image";
import Link from "next/link";

export const EmptyEventList = () => {
  return (
    <section className="empty-event-list">
      <Image src={EventPreview} className="table-preview" alt="Table preview" />
      <p className="description">
        No upcoming events yet.
        <br />
        Click Create Event to get started!
      </p>
      <Link href={"/event-settings/create-event"}>
        <button>
          <CreateEvent />
          Create Event
        </button>
      </Link>
    </section>
  );
};
