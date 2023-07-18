import EventPreview from "@/old/assets/imgs/event-preview.png";
import CreateEvent from "@/old/assets/imgs/create-event.svg";

import Image from "next/image";
import { useRouter } from "next/navigation";

export const EmptyEventList = () => {
  const router = useRouter();

  const onToggleCreateModal = () => {
    router.replace("/event-settings/create-event");
  };

  return (
    <section className="empty-event-list">
      <Image src={EventPreview} className="table-preview" alt="Table preview" />
      <p className="description">
        No upcoming events yet.
        <br />
        Click Create Event to get started!
      </p>
      <button onClick={onToggleCreateModal}>
        <CreateEvent />
        Create Event
      </button>
    </section>
  );
};
