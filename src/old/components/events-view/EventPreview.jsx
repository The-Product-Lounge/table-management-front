import { useMemo, useState } from "react";
import { ClickAwayListener, Tooltip } from "@mui/material";
import removeIcon from "@/old/assets/imgs/remove-member.svg?url";
import Image from "next/image";

export const EventPreview = ({ event }) => {
  const dateToBeDisplayed = useMemo(() => {
    if (!event.date || !event.time) return "Not set";
    return `${new Date(event.date.seconds * 1000).toLocaleDateString(
      undefined,
      {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }
    )} ${new Date(event.time.seconds * 1000).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}`;
  }, [event.date, event.time]);
  const [open, setOpen] = useState(false);

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
          {event.backgroundImgUrl ? (
            <img
              className="background-image"
              src={event.backgroundImgUrl}
              alt=""
            />
          ) : (
            <div
              className="background-image"
              style={{ backgroundColor: "#282828" }}
            ></div>
          )}
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
          <h2 className="name">{event.title}</h2>
          <div className="date">
            <p>{dateToBeDisplayed}</p>
          </div>
          <div className="location">
            <p>{event.location || "Not set"}</p>
          </div>
        </div>
        <div className="tables-info">
          <div className="loungers">
            <p>{`${event.loungersNum ?? "No"} Loungers`}</p>
          </div>
          <p>&bull;</p>
          <div className="tables">
            <p>{`${event.tableIds?.length || "No"} Tables`}</p>
          </div>
        </div>
      </section>
    </>
  );
};
