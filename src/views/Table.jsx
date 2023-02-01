import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getTable } from "../store/actions/table.action"

export const Table = () => {
  const table = useSelector(state => state.tableModule.table)
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    if(!table) dispatch(getTable(params.tableId))
  }, [])

  if(!table) return
  return <div className="table">
    <h1>Table #{table.tableNumber}</h1>
    <h2>Portfolio stage: {table.portfolioStage}</h2>
    <h2>Users:</h2>
    {
      table.users.map(user => {
        return <div>
          <h3>{user.firstName} {user.lastName}</h3>
          <img style={{width:'46px', borderRadius:'50%'}} src={user.imgUrl} />
        </div>
      })
    }
  </div>
}
