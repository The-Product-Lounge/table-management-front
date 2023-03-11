import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import emptyChair from "../assets/imgs/empty-chair.svg"
import { TablePreview } from "../cmps/TablePreview"
import { tableService } from "../services/table.service"
import { off, onValue, ref } from "firebase/database"
import { database } from "../firebase-setup/firebase"

export const TableView = () => {
  const [table, setTable] = useState(null)
  const user = useSelector((state) => state.userModule.user)
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    const tableRef = ref(database, `/tables/${params.tableId}`)
    const listener = onValue(tableRef, (snapshot) => {
      const table = snapshot.val()
      if (
        !table ||
        !user ||
        !table.users?.find((userInTable) => userInTable.id === user.id)
      ) {
        tableService.removeTableIdFromStorage()
        navigate("/")
      } else setTable(table)
    })

    return () => off(tableRef, "value", listener)
  }, [])

  if (!table) return
  let tableParticipants = 4
  return (
    <div className='table-view'>
      <h1 className='table-number'>Table Number</h1>
      <div className='table'>
        <h1>{table.tableNumber}</h1>
        {[...Array(tableParticipants)].map((participant, i) => (
          <div className={`chair _${i + 1}`} key={`chair _${i + 1}`}>
            {table.users[i] && (
              <img
                src={table.users[i].imgUrl}
                alt='Profile'
                className='profile-img'
              />
            )}
            <img src={emptyChair} className='empty-chair' alt='Empty Chair' />
          </div>
        ))}
      </div>
      <TablePreview table={table} />
    </div>
  )
}
