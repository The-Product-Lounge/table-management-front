import { useState } from "react"
import { AppHeader } from "../cmps/AppHeader"
import { EventList } from "../cmps/EventList"
import { EmptyEventList } from "../cmps/EmptyEventList"

export const EventsView = () => {
  const [events, setEvents] = useState([])
  return (
    <section className='events-view'>
      <AppHeader />
      {
        events.length > 0 ? <EventList events={events} /> : <EmptyEventList />
      }
    </section>
  )
}
