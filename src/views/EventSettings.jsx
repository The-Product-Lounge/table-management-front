import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import clearEvent from "../assets/imgs/clear-event.svg"
import closePage from "../assets/imgs/close-event-info.svg"
import { clearTables, getTables } from "../store/actions/table.action"
import { TableList } from "../cmps/TableList"
import { ClearModal } from "../cmps/ClearModal"
import { Loader } from "../cmps/Loader"
import { off, onValue, ref } from "firebase/database"
import { database } from "../firebase-setup/firebase"
import { tableService } from "../services/table.service"

export const EventSettings = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tables, setTables] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const tablesRef = ref(database, `/tables`)
    const listener = onValue(tablesRef, (snapshot) => {
      const data = snapshot.val()
      setTables(data)
    })
    setIsLoading(false)
    return () => off(tablesRef, "value", listener)
  }, [])

  const onClearEvent = async () => {
    try {
      await tableService.clearTables()
    } catch (err) {
      console.log("Cannot empty tables", err)
    } finally {
      setIsModalOpen((prevState) => !prevState)
    }
  }

  const onToggleModal = () => {
    setIsModalOpen((prevState) => !prevState)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='event-settings'>
      <header>
        <div className='header-container'>
          <img
            onClick={onToggleModal}
            src={clearEvent}
            className='clear-event'
            alt='clear event'
          />
          <h1>Event Settings</h1>
          <Link to='/'>
            <img src={closePage} className='close-page' alt='close page' />
          </Link>
        </div>
      </header>
      {tables && <TableList tables={tables} />}
      {isModalOpen && (
        <ClearModal onToggleModal={onToggleModal} onClearEvent={onClearEvent} />
      )}
    </div>
  )
}
