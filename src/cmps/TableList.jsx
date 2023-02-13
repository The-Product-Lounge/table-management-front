import { TablePreview } from './TablePreview'

export const TableList = ({ tables }) => {
  return (
    <section className="table-list">
      {tables.map((table) => {
        return <TablePreview table={table} key={table._id} />
      })}
    </section>
  )
}
