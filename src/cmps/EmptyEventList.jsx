import EventPreview from "../assets/imgs/event-preview.png"
import { ReactComponent as CreateEvent } from "../assets/imgs/create-event.svg"

export const EmptyEventList = () => {
  return (
    <section className='empty-event-list'>
      <img src={EventPreview} className='table-preview' />
      <p className='description'>
        No upcoming events yet.
        <br />
        Click Create Event to get started!
      </p>
      <button>
        <CreateEvent />
        Create Event
      </button>
    </section>
  )
}
