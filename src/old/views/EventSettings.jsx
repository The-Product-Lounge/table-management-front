"use client";
import { useCallback, useEffect, useState } from "react";
import clearEvent from "../assets/imgs/clear-event.svg?url";
import closePage from "../assets/imgs/close-event-info.svg?url";
import { TableList } from "../components/TableList";
import { ClearModal } from "../components/ClearModal";
import { Loader } from "../components/Loader";
import { off, onValue, ref } from "firebase/database";
import { database } from "../firebase-setup/firebase";
import { tableService } from "../services/table.service";
import { utilService } from "../services/util.service";

export const EventSettings = ({ eventId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tables, setTables] = useState([]);
  const [event, setEvent] = useState([]);

  useEffect(() => {
    const eventRef = ref(database, `/events/${eventId}`);
    const listenerEvent = onValue(eventRef, (snapshot) => {
      const data = snapshot.val();
      setEvent(data);
    });

    return () => off(eventRef, "value", listenerEvent);
  }, []);

  useEffect(() => {
    const tablesRef = ref(database, `/tables`);
    const listenerTable = onValue(tablesRef, (snapshot) => {
      let data = snapshot.val();
      if (!data) return;
      const tables = event.tableIds?.map((tableId) => {
        return { id: tableId, ...data[tableId] };
      });
      setTables(tables);
      if (!tables) setIsLoading(false);
    });
    return () => off(tablesRef, "value", listenerTable);
  }, [event]);

  const onClearEvent = useCallback(async () => {
    try {
      await tableService.clearTables();
    } catch (err) {
      console.log("Cannot empty tables", err);
    } finally {
      setIsModalOpen((prevState) => !prevState);
    }
  }, []);

  const onToggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="event-settings">
      <header>
        <div className="header-container">
          <img
            onClick={onToggleModal}
            src={clearEvent.src}
            className="clear-event"
            alt="clear event"
          />
          <h1>Event Settings</h1>
          {/* <Link to="/"> */}
          <img src={closePage.src} className="close-page" alt="close page" />
          {/* </Link> */}
        </div>
      </header>
      <TableList tables={tables} />
      {isModalOpen && (
        <ClearModal onToggleModal={onToggleModal} onClearEvent={onClearEvent} />
      )}
    </div>
  );
};
