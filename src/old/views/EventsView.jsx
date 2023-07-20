import { useEffect, useState } from "react";
import { AppHeader } from "../components/AppHeader";
import { EventList } from "../components/events-view/EventList";
import { EmptyEventList } from "../components/events-view/EmptyEventList";
import { off, onValue, ref } from "firebase/database";
import { database } from "../firebase-setup/firebase";
import { utilService } from "../services/util.service";

export const EventsView = () => {
  const [events, setEvents] = useState([]);

  //! doing this like this allows for UI rerendering when tables change but that means
  //that there cant be two tables with the same table number in different events

  useEffect(() => {
    const eventsRef = ref(database, `/events`);
    const listener = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      const events = utilService.reformatKeyValuePairToArray(data);
      setEvents(events);
    });

    return () => off(eventsRef, "value", listener);
  }, []);

  useEffect(() => {
    const tablesRef = ref(database, `/tables`);
    const listener = onValue(tablesRef, (snapshot) => {
      const data = snapshot.val();
    });

    return () => off(tablesRef, "value", listener);
  }, [events]);

  return (
    <section className="events-view">
      <AppHeader />
      {events.length > 0 ? (
        <div className="events">
          <h2 className="title">Upcoming Events</h2>
          <EventList events={events} />
        </div>
      ) : (
        <EmptyEventList />
      )}
    </section>
  );
};
