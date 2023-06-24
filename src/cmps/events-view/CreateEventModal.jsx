import { useMemo, useRef, useState } from "react"
import { ReactComponent as CloseIcon } from "../../assets/imgs/close-event-info.svg"
import { ReactComponent as Pattern } from "../../assets/imgs/table-pattern.svg"
import { ReactComponent as LocationIcon } from "../../assets/imgs/location-icon.svg"
import { ReactComponent as ClockIcon } from "../../assets/imgs/clock-icon.svg"
import { ReactComponent as CalendarIcon } from "../../assets/imgs/calendar-icon.svg"
import { useStyles, inputProps } from "../../material-ui-setup/customStyles"
import { TextField, TextareaAutosize } from "@mui/material"
import { InputAdornment } from "@material-ui/core"
import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { cloudinaryService } from "../../services/cloudinary.service"

export const CreateEventModal = ({ toggleCreateModal }) => {
  //state
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

  //variables
  const defaultLogoImg =
    "https://res.cloudinary.com/table-management/image/upload/v1685748386/img_icon_npfstv.png"

  //refs
  const inputLogoImageRef = useRef()
  const inputBackgroundImageRef = useRef()

  //displayed imgs
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

  //functions
  const onUploadImg = ({ target: { name, files } }) => {
    console.log(name, files)
    name === "logo"
      ? setUploadedLogo(files[0])
      : setUploadedBackground(files[0])
  }

  const handleChange = (ev, name) => {
    //TODO: merge both time properties into one
    //if it is a time object
    if (name) {
      const selectedDate = new Date(ev).getTime()
      setEvent((prevState) => ({ ...prevState, [name]: selectedDate }))
    } else {
      //if it is other information about the event
      const {
        target: { name, value },
      } = ev
      setEvent((prevState) => ({ ...prevState, [name]: value }))
    }
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    //TODO: write submit logic
    // try {
    //   event.logoImgUrl = displayedLogo
    //     ? await cloudinaryService.uploadImg(displayedLogo)
    //     : `https://res.cloudinary.com/table-management/image/upload/v1685748386/img_icon_npfstv.png`
    // } catch (error) {}
  }

  //styling
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
  ]

  const isButtonDisabled = () => {
    return !(
      event.name &&
      event.date &&
      event.time &&
      event.location &&
      event.details
    )
  }

  const dateToDisplay =
    event.date &&
    new Date(event.date).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })

  const timeToDisplay =
    event.time &&
    new Date(event.time).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })

  return (
    <section className='create-event-modal'>
      <div className='border-box-header-summery'>
        <header>
          <p className='title'>Event Details</p>
          <CloseIcon onClick={toggleCreateModal} className='clickable' />
        </header>
        <div
          className='event-summery-container clickable'
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
            <div className='blur-with-lines background-container'>
              <img
                className='background-image'
                src={displayedBackground}
                alt=''
              />
            </div>
          )}
          <div className='pencil top-right'></div>
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
              className='img-container medium clickable'
              onClick={() => inputLogoImageRef.current.click()}
            >
              <div className='pencil img-decorator'></div>
              <img src={displayedLogo} alt='' className='event-img' />
            </div>
            <div className='summery-text'>
              {event.name ? (
                <h2 className='event-name'>{event.name}</h2>
              ) : (
                <div className='grey-place-holder primary'></div>
              )}
              {event.time || event.date ? (
                <div className='event-time-div'>
                  <div className='event-date'>
                    {event.date && dateToDisplay}
                  </div>
                  <p className='event-time'>{event.time && timeToDisplay}</p>
                </div>
              ) : (
                <div className='grey-place-holder secondary'></div>
              )}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className='event-details'>
          {inputLabelArray.map((labelObject) => {
            const { property, label, icon } = labelObject
            if (label === "Event Details") {
              return (
                <TextareaAutosize
                  className={classes.textarea}
                  variant='inline'
                  label='11111'
                  onChange={handleChange}
                  name={property}
                  value={event[property]}
                />
              )
            } else if (label === "Date") {
              return (
                <DatePicker
                  minDate={dayjs(new Date())}
                  format='DD/MM/YY'
                  slots={{
                    openPickerIcon: CalendarIcon,
                  }}
                  className={classes.datePicker}
                  label={label}
                  onChange={(date) => handleChange(date, property)}
                  name={property}
                />
              )
            } else if (label === "Time") {
              return (
                <TimePicker
                  ampm={false}
                  format='HH:mm'
                  slots={{
                    openPickerIcon: ClockIcon,
                  }}
                  className={classes.datePicker}
                  onChange={(date) => handleChange(date, property)}
                  label={label}
                  name={property}
                />
              )
            } else {
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
                            padding: "0px 10px 0px 0px",
                            color: "#28293D",
                            fontFamily: "poppins-regular",
                            fontSize: "14px",
                          },
                          endAdornment: (
                            <InputAdornment position='end'>
                              {icon}
                            </InputAdornment>
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
          <button onClick={toggleCreateModal} type='button'>
            Cancel
          </button>
          <button className='dark' type='submit' disabled={isButtonDisabled()}>
            Create
          </button>
        </div>
      </form>
    </section>
  )
}
