import { EventPreview } from "./EventPreview"

export const EventList = ({ events, tables }) => {
  return (
    <section className='event-list'>
      {events.map((event) => (
        <EventPreview
          event={event}
          key={event.id}
          tables={tables.filter((table) => event.tableIds.includes(table.id))}
        />
      ))}
    </section>
  )
}
