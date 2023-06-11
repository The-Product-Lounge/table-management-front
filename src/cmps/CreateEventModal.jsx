import { useMemo, useRef, useState } from "react"
import { ReactComponent as CloseIcon } from "../assets/imgs/close-event-info.svg"
import { ReactComponent as Pattern } from "../assets/imgs/table-pattern.svg"
import { ReactComponent as LocationIcon } from "../assets/imgs/location-icon.svg"
import { ReactComponent as ClockIcon } from "../assets/imgs/clock-icon.svg"
import { ReactComponent as CalendarIcon } from "../assets/imgs/calendar-icon.svg"
import { useStyles, inputProps } from "../material-ui-setup/customStyles"
import { TextField, TextareaAutosize } from "@mui/material"
import { InputAdornment } from "@material-ui/core"

export const CreateEventModal = ({ toggleCreateModal }) => {
  const [event, setEvent] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    details: "",
    wifiName: "",
    wifiPassword: "",
    logoImgUrl: "",
    backgroundImgUrl: "",
  })

  const [uploadedLogo, setUploadedLogo] = useState(null)
  const [uploadedBackground, setUploadedBackground] = useState(null)
  const defaultLogoImg =
    "https://res.cloudinary.com/table-management/image/upload/v1685748386/img_icon_npfstv.png"

  const inputLogoImageRef = useRef()
  const inputBackgroundImageRef = useRef()

  const classes = useStyles()

  const inputLabelArray = [
    {
      label: "Title",
      property: "name",
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
      property: "eventDetails",
    },
    {
      label: "Wifi Name",
      property: "wifiName",
    },
    {
      label: "Wifi Password",
      property: "wifiPassword",
    },
  ]

  const displayedLogo = useMemo(() => {
    const logo = uploadedLogo
      ? URL.createObjectURL(uploadedLogo)
      : null || event.logoImgUrl
    return logo ? logo : defaultLogoImg
  }, [uploadedLogo])

  const displayedBackground = useMemo(() => {
    const background = uploadedBackground
      ? URL.createObjectURL(uploadedBackground)
      : null || event.backgroundImgUrl
    return background
  }, [uploadedBackground])

  const onUploadImg = ({ target: { name, files } }) => {
    console.log(name, files)
    name === "logo"
      ? setUploadedLogo(files[0])
      : setUploadedBackground(files[0])
  }

  const handleChange = ({ target: { name, value } }) => {
    setEvent((prevState) => ({ ...prevState, [name]: value }))
  }

  return (
    <section className='create-event-modal'>
      <div className='border-box-header-summery'>
        <header>
          <p className='title'>Event Details</p>
          <CloseIcon onClick={toggleCreateModal} />
        </header>
        <div
          className='event-summery-container'
          onClick={() => inputBackgroundImageRef.current.click()}
        >
          <input
            style={{ display: "none" }}
            type='file'
            id='background'
            name='background'
            ref={inputBackgroundImageRef}
            onChange={onUploadImg}
          />
          {displayedBackground && (
            <div className='background-container'>
              <Pattern />
              <img src={displayedBackground} alt='' />
            </div>
          )}
          <div className='pencil'></div>
          <div className='event-summery' onClick={(ev) => ev.stopPropagation()}>
            <input
              style={{ display: "none" }}
              type='file'
              id='logo'
              name='logo'
              ref={inputLogoImageRef}
              onChange={onUploadImg}
            />
            <div
              className='img-container'
              onClick={() => inputLogoImageRef.current.click()}
            >
              <div className='pencil'></div>
              <img src={displayedLogo} alt='' className='event-img' />
            </div>
            <div className='summery-text'>
              {event.name ? (
                <h2 className='event-name'>{event.name}</h2>
              ) : (
                <div className='grey-place-holder primary'></div>
              )}
              {event.time || event.date ? (
                <p className='event-time'>
                  {event.time && event.time}
                  {event.date && ` ${event.date}`}
                </p>
              ) : (
                <div className='grey-place-holder secondary'></div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='event-details'>
        {inputLabelArray.map((labelObject) => {
          const { property, label, icon } = labelObject
          if (label === "Event Details")
            return (
              <TextareaAutosize
                className={classes.textarea}
                variant='outlined'
                label="11111"
                onChange={handleChange}
                name={property}
                value={event[property]}
              />
            )
          else {
            return (
              <TextField
                className={classes.root}
                label={label}
                variant='outlined'
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
                          padding: "0px 10px",
                          color: "#28293D",
                          fontFamily: "poppins-regular",
                          fontSize: "14px",
                        },
                        endAdornment: (
                          <InputAdornment position='end'>{icon}</InputAdornment>
                        ),
                      }
                    : {}
                }
              />
            )
          }
        })}
      </div>
      <div className='options'>
        <button>Cancel</button>
        <button className='dark' disabled>
          Create
        </button>
      </div>
    </section>
  )
}
