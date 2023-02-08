import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getTable } from "../store/actions/table.action"
import emptyChair from "../assets/imgs/empty-chair.svg"

export const TableView = () => {
  const table = useSelector((state) => state.tableModule.table)
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    if (!table) dispatch(getTable(params.tableId))
  }, [])

  if (!table) return
  let tableParticipants = 4
  return (
    <div className='table-view'>
      <h1 className='table-number'>Table Number</h1>
      <div className='table'>
        <h1>{table.tableNumber}</h1>
        {[...Array(tableParticipants)].map((undefined, i) => (
          <div className={`chair _${i + 1}`} key={`chair _${i + 1}`}>
            {table.users[i] && (
              <img
                src={table.users[i].imgUrl}
                alt=''
                className='profile-img'
              />
            )}
            <img src={emptyChair} className='empty-chair' />
          </div>
        ))}
      </div>
      <div className='at-your-table'>
        <div className='title'>
          <p>Loungers At Your Table</p>
          <p>4/{table.users.length}</p>
        </div>
        <div className='users'>
          {table.users.map((user) => (
            <div className='user-preview'>
              <img
                src={user.imgUrl}
                alt=''
                className='profile-img'
                loading='lazy'
              />
              <div className='user-details'>
                <p>
                  <span className='first-name'>{user.firstName}</span>{" "}
                  {user.lastName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
