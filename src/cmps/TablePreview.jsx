import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { updateTables } from '../store/actions/table.action'
import { UserList } from './UserList'

export const TablePreview = ({ table }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const isLocationTableView = location.pathname.includes('/table')

  const onRemoveLounger = (userId) => {
    const tableCopy = structuredClone(table)
    tableCopy.users = tableCopy.users.filter((user) => user.id != userId)
    dispatch(updateTables(tableCopy))
  }

  return (
    <section className="table-preview">
      {isLocationTableView ? (
        <div className="title table-view-title">
          <p>Loungers At Your Table</p>
          <p>4/{table.users.length}</p>
        </div>
      ) : (
        <div className="title event-info-title">
          <div>
            <h2>Table #{table.tableNumber}</h2>
            <h4>{table.portfolioStage}</h4>
          </div>
          <p>4/{table.users.length}</p>
        </div>
      )}

      {table.users.length !== 0 && (
        <UserList users={table.users} onRemoveLounger={onRemoveLounger} />
      )}
    </section>
  )
}
