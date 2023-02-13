import { useLocation } from 'react-router-dom'
import { UserList } from './UserList'

export const TablePreview = ({ table }) => {
  const location = useLocation()
  const isLocationTableView = location.pathname.includes('/table')

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

      <UserList users={table.users} />
    </section>
  )
}
