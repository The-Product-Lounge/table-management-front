import { useLocation } from 'react-router-dom'
import tableMemberMenu from '../assets/imgs/table-member-menu.svg'

export const UserPreview = ({ user }) => {
  const location = useLocation()
  const isLocationTableView = location.pathname.includes('/table')

  return (
    <section className="user-preview">
      <img src={user.imgUrl} alt="" className="profile-img" loading="lazy" />
      <div className="user-details">
        <p>
          <span className="first-name">{user.firstName}</span> {user.lastName}
        </p>
        {!isLocationTableView && <img src={tableMemberMenu} />}
      </div>
    </section>
  )
}
