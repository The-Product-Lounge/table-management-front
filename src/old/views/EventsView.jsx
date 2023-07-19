import { useEffect, useState } from "react";
import { AppHeader } from "../components/AppHeader";
import { EventList } from "../components/events-view/EventList";
import { EmptyEventList } from "../components/events-view/EmptyEventList";
import { events as eventsFromDB } from "../events.js";
import { off, onValue, ref } from "firebase/database";
import { database } from "../firebase-setup/firebase";
import { utilService } from "../services/util.service";

export const EventsView = () => {
  const [events, setEvents] = useState([]);
  const [tables, setTables] = useState([]);
  const [isFirstHookCompleted, setIsFirstHookCompleted] = useState(false);

  //! doing this like this allows for UI rerendering when tables change but that means
  //that there cant be two tables with the same table number in different events

  useEffect(() => {
    const eventsRef = ref(database, `/events`);
    const listener = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      const events = utilService.reformatKeyValuePairToArray(data);
      setEvents(events);
      setIsFirstHookCompleted(true);
    });

    return () => off(eventsRef, "value", listener);
  }, []);

  useEffect(() => {
    if (isFirstHookCompleted) {
      const tablesRef = ref(database, `/tables`);
      const listener = onValue(tablesRef, (snapshot) => {
        const data = snapshot.val();
        const tables = utilService.reformatKeyValuePairToArray(
          data,
          "tableNumber"
        );
        setTables(tables);
      });

      return () => off(tablesRef, "value", listener);
    }
  }, [events]);

  return (
    <section className="events-view">
      <AppHeader />
      {events.length > 0 ? (
        <div className="events">
          <h2 className="title">Upcoming Events</h2>
          <EventList events={events} tables={tables} />
        </div>
      ) : (
        <EmptyEventList />
      )}
    </section>
  );
};
