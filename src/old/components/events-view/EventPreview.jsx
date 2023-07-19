import { useMemo, useState } from "react";
import { ClickAwayListener, Tooltip } from "@mui/material";
import removeIcon from "@/old/assets/imgs/remove-member.svg?url";
import Image from "next/image";

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
    })}`;
  }, [event.date, event.time]);
  const [open, setOpen] = useState(false);

  const numberOfLoungers = useMemo(() => {
    const loungers = tables.reduce((a, table) => {
      return table.users.length + a;
    }, 0);
    return loungers ? loungers : "No";
  }, [tables]);

  const numberOfTables = useMemo(() => {
    return tables.length ? tables.length : "No";
  }, [tables]);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <section className="event-preview">
        <div className="images blur-with-lines">
          <img
            className="background-image"
            src={event.backgroundImgUrl}
            alt=""
          />
          <div className="img-container small">
            <img src={event.logoImgUrl} alt="" />
          </div>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                  <div
                    className="tooltip-container"

                    // onClick={}
                  >
                    <Image
                      className="remove-event"
                      src={removeIcon}
                      alt="remove event"
                    />
                    <span>Delete Event</span>
                  </div>
                }
                placement="left"
                arrow
              >
                <div
                  className="more-options clickable"
                  id={`tooltip-${event.id}`}
                  onClick={handleTooltipOpen}
                ></div>
              </Tooltip>
            </div>
          </ClickAwayListener>
        </div>
        <div className="details">
          <h2 className="name">{event.name}</h2>
          <div className="date">
            <p>{dateToBeDisplayed}</p>
          </div>
          <div className="location">
            <p>{event.location}</p>
          </div>
        </div>
        <div className="tables-info">
          <div className="loungers">
            <p>{`${numberOfLoungers} Loungers`}</p>
          </div>
          <p>&bull;</p>
          <div className="tables">
            <p>{`${numberOfTables} Tables`}</p>
          </div>
        </div>
      </section>
    </>
  );
};
