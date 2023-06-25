import { useMemo } from "react"
import { Tooltip } from "react-tooltip"
import removeIcon from "../../assets/imgs/remove-member.svg"

//TODO: where to place the tables? place them higher than here and they will trigger rerendering of all events if one table changes

export const EventPreview = ({ event, tables }) => {
  const dateToBeDisplayed = useMemo(() => {
    return `${new Date(event.date).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })} ${new Date(event.time).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}`
  }, [event.date, event.time])

  const numberOfLoungers = useMemo(() => {
    const loungers = tables.reduce((a, table) => {
      return table.users.length + a
    }, 0)
    return loungers ? loungers : "No"
  }, [tables])

  const numberOfTables = useMemo(() => {
    return tables.length ? tables.length : "No"
  }, [tables])

  return (
    <>
      <Tooltip
        anchorId={`tooltip-${event.id}`}
        // placement = 'bottom'
        place='top'
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
          // onClick={}
        >
          <img className='remove-event' src={removeIcon} alt='remove event' />
          <span>Delete Event</span>
        </div>
      </Tooltip>
      <section className='event-preview'>
        <div className='images blur-with-lines'>
          <img
            className='background-image'
            src={event.backgroundImgUrl}
            alt=''
          />
          <div className='img-container small'>
            <img src={event.logoImgUrl} alt='' />
          </div>
          <div
            className='more-options clickable'
            id={`tooltip-${event.id}`}
          ></div>
        </div>
        <div className='details'>
          <h2 className='name'>{event.name}</h2>
          <div className='date'>
            <p>{dateToBeDisplayed}</p>
          </div>
          <div className='location'>
            <p>{event.location}</p>
          </div>
        </div>
        <div className='tables-info'>
          <div className='loungers'>
            <p>{`${numberOfLoungers} Loungers`}</p>
          </div>
          <p>&bull;</p>
          <div className='tables'>
            <p>{`${numberOfTables} Tables`}</p>
          </div>
        </div>
      </section>
    </>
  )
}
