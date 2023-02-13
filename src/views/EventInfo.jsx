import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import clearEvent from '../assets/imgs/clear-event.svg'
import closePage from '../assets/imgs/close-event-info.svg'
import { loadTables } from '../store/actions/table.action'

export const EventInfo = () => {
  const tables = useSelector((state) => state.tableModule.tables)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loadTables())
  }, [])

  const onRemoveLounger = (ev) => {}

  const onClearEvent = async (ev) => {
    // TODO: A method to clear event details
  }

  return (
    <div className="event-info">
      <header>
        <div className="header-container">
          <img src={clearEvent} className="clear-event" />
          <h1>Event Info</h1>
          <Link to="/">
            <img src={closePage} className="close-page" />
          </Link>
        </div>
      </header>
    </div>
  )
}
