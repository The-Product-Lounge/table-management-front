import { UserPreview } from "./UserPreview"

export const UserList = ({ users }) => {
  return (
    <section className='user-list'>
      {users.map((user) => (
        <UserPreview user={user} />
      ))}
    </section>
  )
}
