"use client";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import clearEvent from "../assets/imgs/clear-event.svg";
import closePage from "../assets/imgs/close-event-info.svg";
import { TableList } from "../components/TableList";
import { ClearModal } from "../components/ClearModal";
import { Loader } from "../components/Loader";
import { off, onValue, ref } from "firebase/database";
import { database } from "../firebase-setup/firebase";
import { tableService } from "../services/table.service";
import { utilService } from "../services/util.service";

export const EventSettings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const tablesRef = ref(database, `/tables`);
    const listener = onValue(tablesRef, (snapshot) => {
      const data = snapshot.val();
      const tables = utilService.reformatKeyValuePairToArray(
        data,
        "tableNumber"
      );
      setTables(tables);
    });
    setIsLoading(false);
    return () => off(tablesRef, "value", listener);
  }, []);

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
