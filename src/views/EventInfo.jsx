import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const EventInfo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const table = useSelector((state) => state.tableModule.table)

  useEffect(() => {}, [])

  const onRemoveLounger = (ev) => {}

  const onClearEvent = async (ev) => {
    // TODO: A method to clear event details
  }

  return <div className="event-info">Event Info</div>
}
