import { useMemo, useRef, useState } from "react";
import CloseIcon from "@/old/assets/imgs/close-event-info.svg";
import Pattern from "@/old/assets/imgs/table-pattern.svg";
import LocationIcon from "@/old/assets/imgs/location-icon.svg";
import ClockIcon from "@/old/assets/imgs/clock-icon.svg";
import CalendarIcon from "@/old/assets/imgs/calendar-icon.svg";
import { TextField, TextareaAutosize, InputAdornment } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { stylesX, inputProps } from "@/old/material-ui-setup/customStyles";
import { cloudinaryService } from "@/old/services/cloudinary.service";
import { useRouter } from "next/navigation";
import { createEvent } from "@/old/services/events.service";
import { useSession } from "next-auth/react";

export const CreateEventModal = () => {
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.replace("/");
    },
  });

  //state
  const router = useRouter();
  const [event, setEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    details: "",
    wifiName: "",
    wifiPassword: "",
    logoImgUrl: "",
    backgroundImgUrl: "",
  });
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [uploadedBackground, setUploadedBackground] = useState(null);

  //refs
  const inputLogoImageRef = useRef();
  const inputBackgroundImageRef = useRef();

  //displayed imgs
  const displayedLogo = useMemo(() => {
    const logo = uploadedLogo
      ? URL.createObjectURL(uploadedLogo)
      : null || event.logoImgUrl;
    return logo;
  }, [uploadedLogo]);

  const displayedBackground = useMemo(() => {
    const background = uploadedBackground
      ? URL.createObjectURL(uploadedBackground)
      : null || event.backgroundImgUrl;
    return background;
  }, [uploadedBackground]);

  //functions
  const onClose = () => {
    router.replace("/event-settings");
  };

  const onUploadImg = ({ target: { name, files } }) => {
    name === "logo"
      ? setUploadedLogo(files[0])
      : setUploadedBackground(files[0]);
  };

  const handleChange = (ev, name) => {
    //TODO: merge both time properties into one
    //if it is a time object
    if (name) {
      const selectedDate = new Date(ev).getTime();
      setEvent((prevState) => ({ ...prevState, [name]: selectedDate }));
    } else {
      //if it is other information about the event
      const {
        target: { name, value },
      } = ev;
      setEvent((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    //TODO: write submit logic
    try {
      await createEvent(
        {
          ...event,
          logoImgUrl: uploadedLogo
            ? await cloudinaryService.uploadImg(uploadedLogo)
            : "",
          backgroundImgUrl: uploadedBackground
            ? await cloudinaryService.uploadImg(uploadedBackground)
            : "",
        },
        data.access_token
      );
    } catch (error) {
      console.log(error);
    }
  };

  //styling
  const inputLabelArray = [
    {
      label: "Title",
      property: "title",
    },
    {
      label: "Date",
      property: "date",
      icon: <CalendarIcon />,
    },
    {
      label: "Time",
      property: "time",
      icon: <ClockIcon />,
    },
    {
      label: "Location",
      property: "location",
      icon: <LocationIcon />,
    },
    {
      label: "Event Details",
      property: "details",
    },
    {
      label: "Wifi Name",
      property: "wifiName",
    },
    {
      label: "Wifi Password",
      property: "wifiPassword",
    },
  ];

  const isButtonDisabled = () => {
    return !event.title;
  };

  const dateToDisplay =
    event.date &&
    new Date(event.date).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

  const timeToDisplay =
    event.time &&
    new Date(event.time).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  return (
    <section className="create-event-modal">
      <div className="border-box-header-summery">
        <header>
          <p className="title">Event Details</p>
          <CloseIcon onClick={onClose} className="clickable" />
        </header>
        <div
          className="event-summery-container clickable"
          onClick={() => inputBackgroundImageRef.current.click()}
        >
          <input
            style={{ display: "none" }}
            type="file"
            id="background"
            name="background"
            ref={inputBackgroundImageRef}
            onChange={onUploadImg}
          />
          {displayedBackground && (
            <div className="blur-with-lines background-container">
              <img
                className="background-image"
                src={displayedBackground}
                alt=""
              />
            </div>
          )}
          <div className="pencil top-right"></div>
          <div className="event-summery" onClick={(ev) => ev.stopPropagation()}>
            <input
              style={{ display: "none" }}
              type="file"
              id="logo"
              name="logo"
              ref={inputLogoImageRef}
              onChange={onUploadImg}
            />
            <div
              className="img-container medium clickable"
              onClick={() => inputLogoImageRef.current.click()}
            >
              <div className="pencil img-decorator"></div>
              <img src={displayedLogo} alt="" className="event-img" />
            </div>
            <div className="summery-text">
              {event.name ? (
                <h2 className="event-name">{event.name}</h2>
              ) : (
                <div className="grey-place-holder primary"></div>
              )}
              {event.time || event.date ? (
                <div className="event-time-div">
                  <div className="event-date">
                    {event.date && dateToDisplay}
                  </div>
                  <p className="event-time">{event.time && timeToDisplay}</p>
                </div>
              ) : (
                <div className="grey-place-holder secondary"></div>
              )}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="event-details">
          {inputLabelArray.map((labelObject) => {
            const { property, label, icon } = labelObject;
            if (label === "Event Details") {
              return (
                <TextField
                  key={property}
                  label={label}
                  onChange={handleChange}
                  name={property}
                  value={event[property]}
                  multiline
                />
              );
            } else if (label === "Date") {
              return (
                <DatePicker
                  key={property}
                  minDate={dayjs(new Date())}
                  format="DD/MM/YY"
                  slotProps={{
                    textField: {
                      InputProps: {
                        style: {
                          height: "48px",
                          padding: "0px 10px 0px 0px",
                          color: "#28293D",
                          fontFamily: "poppins-regular",
                          fontSize: "14px",
                        },
                        endAdornment: (
                          <InputAdornment position="end">{icon}</InputAdornment>
                        ),
                      },
                    },
                  }}
                  className={stylesX.datePicker}
                  label={label}
                  onChange={(date) => handleChange(date, property)}
                  name={property}
                />
              );
            } else if (label === "Time") {
              return (
                <TimePicker
                  key={property}
                  ampm={false}
                  format="HH:mm"
                  className={stylesX.datePicker}
                  onChange={(date) => handleChange(date, property)}
                  label={label}
                  name={property}
                  slotProps={{
                    textField: {
                      InputProps: {
                        style: {
                          height: "48px",
                          padding: "0px 10px 0px 0px",
                          color: "#28293D",
                          fontFamily: "poppins-regular",
                          fontSize: "14px",
                        },
                        endAdornment: (
                          <InputAdornment position="end">{icon}</InputAdornment>
                        ),
                      },
                    },
                  }}
                />
              );
            } else {
              return (
                <TextField
                  key={property}
                  className={stylesX.root}
                  label={label}
                  variant="outlined"
                  inputProps={inputProps}
                  fullWidth={true}
                  onChange={handleChange}
                  name={property}
                  value={event[property]}
                  InputProps={
                    icon
                      ? {
                          style: {
                            height: "48px",
                            padding: "0px 10px 0px 0px",
                            color: "#28293D",
                            fontFamily: "poppins-regular",
                            fontSize: "14px",
                          },
                          endAdornment: (
                            <InputAdornment position="end">
                              {icon}
                            </InputAdornment>
                          ),
                        }
                      : {}
                  }
                />
              );
            }
          })}
        </div>
        <div className="options">
          <button onClick={onClose} type="button">
            Cancel
          </button>
          <button className="dark" type="submit" disabled={isButtonDisabled()}>
            Create
          </button>
        </div>
      </form>
    </section>
  );
};
