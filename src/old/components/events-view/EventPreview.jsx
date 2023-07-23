import { useMemo, useState } from "react";
import {
  ClickAwayListener,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Tooltip,
} from "@mui/material";
import RemoveIcon from "@/old/assets/imgs/remove-member.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { removeEvent } from "@/old/services/events.service";
import { useSession } from "next-auth/react";

export const EventPreview = ({ event }) => {
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.replace("/");
    },
  });
  const router = useRouter();
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

  const handleDeleteEvent = (e) => {
    e.stopPropagation();
    removeEvent(event.id, data.access_token);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  return (
    <>
      <section
        className="event-preview"
        onClick={() => router.push(`event-settings/event/${event.id}`)}
      >
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
                  <MenuList sx={{ fontSize: "16px" }}>
                    <MenuItem
                      sx={{ minHeight: "40px" }}
                      onClick={handleDeleteEvent}
                    >
                      <ListItemIcon>
                        <RemoveIcon />
                      </ListItemIcon>
                      <ListItemText>Delete Event</ListItemText>
                    </MenuItem>
                  </MenuList>
                }
                placement="top-end"
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
