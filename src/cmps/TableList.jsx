import { TablePreview } from "./TablePreview"

export const TableList = ({ tables }) => {
  return (
    <section className='table-list'>
      {Object.entries(tables).map(([id, table]) => (
        <TablePreview table={table} tableId={id} key={id} />
      ))}
    </section>
  )
}
