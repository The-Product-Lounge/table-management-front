import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getTable } from '../store/actions/table.action'
import emptyChair from '../assets/imgs/empty-chair.svg'
import { TablePreview } from '../cmps/TablePreview'

export const TableView = () => {
  const table = useSelector((state) => state.tableModule.table)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    dispatch(getTable(params.tableId))
  }, [dispatch, params.tableId])

  useEffect(() => {
    if (!table) navigate('/')
  }, [table, navigate])

  if (!table) return
  let tableParticipants = 4
  return (
    <div className="table-view">
      <h1 className="table-number">Table Number</h1>
      <div className="table">
        <h1>{table.tableNumber}</h1>
        {[...Array(tableParticipants)].map((participant, i) => (
          <div className={`chair _${i + 1}`} key={`chair _${i + 1}`}>
            {table.users[i] && (
              <img
                src={table.users[i].imgUrl}
                alt="Profile"
                className="profile-img"
              />
            )}
            <img src={emptyChair} className="empty-chair" alt="Empty Chair" />
          </div>
        ))}
      </div>
      <TablePreview table={table} />
    </div>
  )
}