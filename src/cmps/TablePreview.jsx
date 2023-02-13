import { UserList } from "./UserList"

export const TablePreview = ({ table }) => {
  return (
    <section className='table-preview'>
      <div className='title'>
        <p>Loungers At Your Table</p>
        <p>4/{table.users.length}</p>
      </div>
      <UserList users={table.users} />
    </section>
  )
}
