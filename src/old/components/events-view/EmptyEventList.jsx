import EventPreview from "../../assets/imgs/event-preview.png"
import { ReactComponent as CreateEvent } from "../../assets/imgs/create-event.svg"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { CreateEventModal } from "./CreateEventModal"

export const EmptyEventList = () => {
  const [isCreateEventModalOpen, setIsCreateModalOpen] = useState(false)

  const onToggleCreateModal = () => {
    setIsCreateModalOpen((state) => !state)
  }

  return (
    <section className='empty-event-list'>
      <img src={EventPreview} className='table-preview' />
      <p className='description'>
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
  )
}
