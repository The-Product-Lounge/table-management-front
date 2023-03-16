import { useLocation } from "react-router-dom"
import tableMemberMenu from "../assets/imgs/table-member-menu.svg"
import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
import removeLounger from "../assets/imgs/remove-member.svg"
import { useSelector } from "react-redux"
import { utilService } from "../services/util.service"
import { useMemo } from "react"

export const UserPreview = ({ user, onRemoveLounger }) => {
  const location = useLocation()
  const isLocationTableView = location.pathname.includes("/table")
  const userFromState = useSelector((state) => state.userModule.user)

  const firstNameIsInHebrew = useMemo(() => {
    return utilService.isInHebrew(user.firstName)
  }, [user.firstName])

  const lastNameIsInHebrew = useMemo(() => {
    return utilService.isInHebrew(user.lastName)
  }, [user.lastName])

  return (
    <section className='user-preview'>
      <div className='profile-img-container'>
        <img src={user.imgUrl} alt='' className='profile-img' loading='lazy' />
      </div>
      <div className='user-details'>
        <div className='user-name-and-you'>
          <p lang={lastNameIsInHebrew ? "he" : "en"}>
            <span
              className='first-name'
              lang={firstNameIsInHebrew ? "he" : "en"}
            >
              {user.firstName}
            </span>{" "}
            {user.lastName}
          </p>
          {userFromState?.id === user.id && isLocationTableView && (
            <p className='you'>You</p>
          )}
        </div>
        {!isLocationTableView && (
          <img
            id={`tooltip-${user.id}`}
            className='member-menu'
            src={tableMemberMenu}
            alt='Table member menu'
          />
        )}
        <Tooltip
          anchorId={`tooltip-${user.id}`}
          place='left'
          events={["click"]}
          style={{
            backgroundColor: "white",
            color: "#28293F",
            boxShadow: "0px 4px 12px #60617029",
            opacity: "1",
            pointerEvents: "auto",
          }}
        >
          <div
            className='tooltip-container'
            onClick={() => onRemoveLounger(user.id)}
          >
            <img
              className='remove-lounger'
              src={removeLounger}
              alt='remove lounger'
            />
            <span>Remove Lounger</span>
          </div>
        </Tooltip>
      </div>
    </section>
  )
}
