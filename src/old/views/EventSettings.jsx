"use client";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import QrCode from "@/../public/qr-code-icon.svg";
import { TableList } from "../components/TableList";
import { ClearModal } from "../components/ClearModal";
import { Loader } from "../components/Loader";
import { off, onValue, ref } from "firebase/database";
import { database } from "../firebase-setup/firebase";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/navigation";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  ClickAwayListener,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Modal,
  Paper,
  Snackbar,
  Tooltip,
} from "@mui/material";
import EditIcon from "@/../public/edit-icon.svg";
import ClearEvent from "@/../public/clear-event-icon.svg";
import { removeTables } from "../services/events.service";
import { QRCodeSVG } from "qrcode.react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useSession } from "next-auth/react";
import EndEvent from "@/../public/end-event.svg";
import Link from "next/link";

export const EventSettings = ({ eventId }) => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.replace("/");
    },
  });
  const accessToken = session?.data?.access_token;
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tables, setTables] = useState([]);
  const [event, setEvent] = useState([]);

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

  const handleTooltipOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  useEffect(() => {
    const eventRef = ref(database, `/events/${eventId}`);
    const listenerEvent = onValue(eventRef, (snapshot) => {
      const data = snapshot.val();
      setEvent(data);
    });

    return () => off(eventRef, "value", listenerEvent);
  }, []);

  useEffect(() => {
    const tablesRef = ref(database, `/tables`);
    const listenerTable = onValue(tablesRef, (snapshot) => {
      let data = snapshot.val();
      setIsLoading(false);
      if (!data) return setTables([]);
      const tables = event.tableIds?.map((tableId) => {
        return { id: tableId, ...data[tableId] };
      });
      setTables(tables);
    });
    return () => off(tablesRef, "value", listenerTable);
  }, [event]);

  const handleRemoveTables = useCallback(async () => {
    try {
      console.log(accessToken, session);
      await removeTables(eventId, accessToken);
    } catch (err) {
      console.log("Cannot empty tables", err);
    } finally {
      setIsModalOpen((prevState) => !prevState);
    }
  }, []);

  const onToggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
    setOpen(false);
  };

  const handleQRModalOpen = () => {
    setIsQRModalOpen(true);
  };
  const handleQRModalClose = () => {
    setIsQRModalOpen(false);
  };

  const textToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.host}/${eventId}`);
    setSnackBarOpen(true);
  };

  const snackBarClose = () => {
    setSnackBarOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="event-settings">
      <header>
        <div className="header-container">
          <ArrowBackIosIcon
            onClick={() => {
              router.back();
            }}
          />
          <h3>Manage Event</h3>
          <QrCode onClick={handleQRModalOpen} />
        </div>
      </header>
      <header style={{ marginTop: "2px", fontSize: "12px" }}>
        <div className="header-container">
          <div className="img-container small">
            <img
              src={event.logoImgUrl}
              style={{ width: "35px", height: "35px" }}
              alt=""
            />
          </div>
          <div
            style={{
              flex: "1",
              padding: "18px 20px 16px 20px",
              display: "flex",
              flexDirection: "column",
              borderBottom: "1px solid #0000001a",
            }}
          >
            <h3
              style={{
                color: "#282941",
                fontSize: "16px",
                fontFamily: "poppins-regular",
                marginBottom: "10px",
              }}
            >
              {event.title}
            </h3>
            <div
              style={{
                paddingLeft: "2px",
                position: "relative",
                display: "flex",
                marginBottom: "6px",
              }}
            >
              <p>{dateToBeDisplayed}</p>
            </div>
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
                    <Link href={`/event-settings/update-event/${eventId}`}>
                      <MenuItem sx={{ minHeight: "40px" }}>
                        <ListItemIcon>
                          <EditIcon />
                        </ListItemIcon>
                        <ListItemText>Edit event</ListItemText>
                      </MenuItem>
                    </Link>
                    <Divider />
                    <MenuItem
                      sx={{ minHeight: "40px" }}
                      onClick={onToggleModal}
                    >
                      <ListItemIcon>
                        <EndEvent />
                      </ListItemIcon>
                      <ListItemText>End event</ListItemText>
                    </MenuItem>
                    <MenuItem
                      sx={{ minHeight: "40px" }}
                      onClick={onToggleModal}
                    >
                      <ListItemIcon>
                        <ClearEvent />
                      </ListItemIcon>
                      <ListItemText>Clear Tables</ListItemText>
                    </MenuItem>
                  </MenuList>
                }
                placement="bottom-start"
                arrow
              >
                <MoreVertIcon onClick={handleTooltipOpen} />
              </Tooltip>
            </div>
          </ClickAwayListener>
        </div>
      </header>
      <TableList tables={tables} />

      <Modal
        open={isQRModalOpen}
        onClose={handleQRModalClose}
        aria-labelledby="QR code event check-in"
        aria-describedby="QR code that can be used to get to the check-in page of the event"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "16px",
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <QRCodeSVG size={257} value={`${window.location.host}/${eventId}`} />
          <Box sx={{ display: "flex", marginTop: "20px" }}>
            <span
              style={{
                fontSize: "12px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                display: "inline-block",
              }}
            >{`${window.location.host}/${eventId}`}</span>
            <ContentCopyIcon onClick={textToClipboard} />
          </Box>
          <Button
            variant="outlined"
            fullWidth
            sx={{ marginTop: "20px" }}
            onClick={handleQRModalClose}
            size="large"
          >
            Dismiss
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={1000 * 3}
        onClose={snackBarClose}
        message="Copied!"
      />
      {isModalOpen && (
        <ClearModal
          onToggleModal={onToggleModal}
          onClearEvent={handleRemoveTables}
        />
      )}
    </div>
  );
};
