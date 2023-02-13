import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import clearEvent from '../assets/imgs/clear-event.svg'
import closePage from '../assets/imgs/close-event-info.svg'
import { loadTables } from '../store/actions/table.action'
import { tableService } from '../services/table.service'
import { TableList } from '../cmps/TableList'
import { ClearModal } from '../cmps/ClearModal'

export const EventInfo = () => {
  const [tables, setTables] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const dispatch = useDispatch()
  // const navigate = useNavigate()

  const getTables = async () => {
    const tablesFromDB = await tableService.getTables()
    setTables(tablesFromDB)
  }

  useEffect(() => {
    getTables()
  }, [])

  // const onRemoveLounger = (ev) => {}

  const onClearEvent = async () => {
    try {
      await tableService.clearTables()
      setTables([])
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
