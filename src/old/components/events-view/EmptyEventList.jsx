import EventPreview from "@/old/assets/imgs/event-preview.png";
import CreateEvent from "@/old/assets/imgs/create-event.svg";
import { useState } from "react";
import { CreateEventModal } from "./CreateEventModal";
import Image from "next/image";

export const EmptyEventList = () => {
  const [isCreateEventModalOpen, setIsCreateModalOpen] = useState(false);

  const onToggleCreateModal = () => {
    setIsCreateModalOpen((state) => !state);
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
      {isCreateEventModalOpen && (
        <CreateEventModal toggleCreateModal={onToggleCreateModal} />
      )}
    </section>
  );
};
