"use client";

import tableMemberMenu from "../assets/imgs/table-member-menu.svg";
import { Tooltip } from "@mui/material";
import removeLounger from "../assets/imgs/remove-member.svg";
import { useSelector } from "react-redux";
import { utilService } from "../services/util.service";
import { useMemo, useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";

export const UserPreview = ({ user, onRemoveLounger }) => {
  const userFromState = useSelector((state) => state.userModule.user);
  const [open, setOpen] = useState(false);

  const firstNameIsInHebrew = useMemo(() => {
    return utilService.isInHebrew(user.firstName);
  }, [user.firstName]);

  const lastNameIsInHebrew = useMemo(() => {
    return utilService.isInHebrew(user.lastName);
  }, [user.lastName]);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <section className="user-preview">
      <div className="profile-img-container">
        <img src={user.imgUrl} alt="" className="profile-img" loading="lazy" />
      </div>
      <div className="user-details">
        <div className="user-name-and-you">
          <p lang={lastNameIsInHebrew ? "he" : "en"}>
            <span
              className="first-name"
              lang={firstNameIsInHebrew ? "he" : "en"}
            >
              {user.firstName}
            </span>{" "}
            {user.lastName}
          </p>
          {userFromState?.id === user.id && !onRemoveLounger && (
            <p className="you">You</p>
          )}
        </div>
        {onRemoveLounger && (
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                  <div className="react-tooltip">
                    <div
                      className="tooltip-container"
                      onClick={() => onRemoveLounger(user.id)}
                    >
                      <img
                        className="remove-lounger"
                        src={removeLounger.src}
                        alt="remove lounger"
                      />
                      <span>Remove Lounger</span>
                    </div>
                  </div>
                }
                placement="left"
                arrow
              >
                <img
                  onClick={handleTooltipOpen}
                  id={`tooltip-${user.id}`}
                  className="member-menu"
                  src={tableMemberMenu.src}
                  alt="Table member menu"
                />
              </Tooltip>
            </div>
          </ClickAwayListener>
        )}
      </div>
    </section>
  );
};
