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
  return <div>
    {
      JSON.stringify(table)
    }
  </div>
}
