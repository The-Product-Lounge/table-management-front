import { UserPreview } from './UserPreview'

export const UserList = ({ users }) => {
  return (
    <section className="user-list">
      {users.map((user) => {
        return <UserPreview user={user} key={user.imgUrl} />
      })}
    </section>
  )
}
