import { useLocation } from 'react-router-dom'
import tableMemberMenu from '../assets/imgs/table-member-menu.svg'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import removeLounger from '../assets/imgs/remove-member.svg'

export const UserPreview = ({ user, onRemoveLounger }) => {
  const location = useLocation()
  const isLocationTableView = location.pathname.includes('/table')

  return (
    <section className="user-preview">
      <img src={user.imgUrl} alt="" className="profile-img" loading="lazy" />
      <div className="user-details">
        <p>
          <span className="first-name">{user.firstName}</span> {user.lastName}
        </p>
        {!isLocationTableView && (
          <img
            id={`tooptip-${user.id}`}
            className="member-menu"
            src={tableMemberMenu}
            alt="Table member menu"
          />
        )}
        <Tooltip
          anchorId={`tooptip-${user.id}`}
          place="left"
          events={['click']}
          style={{
            backgroundColor: 'white',
            color: '#28293F',
            boxShadow: '0px 4px 12px #60617029',
            opacity: '1',
            pointerEvents: 'auto',
          }}
        >
          <div
            className="tooltip-container"
            onClick={() => onRemoveLounger(user.id)}
          >
            <img
              className="remove-lounger"
              src={removeLounger}
              alt="remove lounger"
            />
            <span>Remove Lounger</span>
          </div>
        </Tooltip>
      </div>
    </section>
  )
}
