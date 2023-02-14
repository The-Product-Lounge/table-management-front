import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import clearEvent from '../assets/imgs/clear-event.svg'
import closePage from '../assets/imgs/close-event-info.svg'
import { clearTables, getTables } from '../store/actions/table.action'
import { tableService } from '../services/table.service'
import { TableList } from '../cmps/TableList'
import { ClearModal } from '../cmps/ClearModal'

export const EventInfo = () => {
  const tables = useSelector((state) => state.tableModule.tables)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTables())
  }, [])

  const onClearEvent = async () => {
    try {
      dispatch(clearTables())
    } catch (err) {
      console.log('Cannot empty tables', err)
    } finally {
      setIsModalOpen((prevState) => !prevState)
    }
  }

  const onToggleModal = () => {
    setIsModalOpen((prevState) => !prevState)
  }

  return (
    <div className="event-info">
      <header>
        <div className="header-container">
          <img
            onClick={onToggleModal}
            src={clearEvent}
            className="clear-event"
          />
          <h1>Event Info</h1>
          <Link to="/">
            <img src={closePage} className="close-page" />
          </Link>
        </div>
      </header>
      <TableList tables={tables} />
      {isModalOpen && (
        <ClearModal onToggleModal={onToggleModal} onClearEvent={onClearEvent} />
      )}
    </div>
  )
}
