import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import clearEvent from '../assets/imgs/clear-event.svg'
import closePage from '../assets/imgs/close-event-info.svg'
import { clearTables, getTables } from '../store/actions/table.action'
import { TableList } from '../cmps/TableList'
import { ClearModal } from '../cmps/ClearModal'

export const EventSettings = () => {
  const tables = useSelector((state) => state.tableModule.tables)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTables())
  }, [dispatch])

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
    <div className="event-settings">
      <header>
        <div className="header-container">
          <img
            onClick={onToggleModal}
            src={clearEvent}
            className="clear-event"
            alt="clear event"
          />
          <h1>Event Settings</h1>
          <Link to="/">
            <img src={closePage} className="close-page" alt="close page" />
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
