import { React, useMemo, useRef, useState } from "react"
import logo from "../assets/imgs/logo@2x.png"
import eventSettings from "../assets/imgs/event-settings.svg"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { cloudinaryService } from "../services/cloudinary.service"
import { Box, MenuItem, TextField, Typography } from "@mui/material"
import { PasswordModal } from "../cmps/PasswordModal"
import { setUser } from "../store/actions/user.action"
import { Loader } from "../cmps/Loader"
import { database } from "../firebase-setup/firebase"
import { onValue, ref } from "firebase/database"
import { tableService } from "../services/table.service"
import { storageService } from "../services/local-storage.service"
import { utilService } from "../services/util.service"
import { useStyles } from "../material-ui-setup/customStyles"

export const Form = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    portfolioStage: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [img, setImg] = useState(null)
  const inputImageRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const defaultUserImg =
    "https://res.cloudinary.com/table-management/image/upload/v1680271751/New_Project_eub3nb.png"

  const imgUrl = useMemo(() => {
    return img ? URL.createObjectURL(img) : defaultUserImg
  }, [img])

  useEffect(() => {
    const tableId = tableService.getTableIdFromStorage()
    const uuid = storageService.getFromStorage("uuid")
    if (tableId) navigate(`table/${tableId}`)
    else if (uuid) listenToUuid(uuid)
  }, [])

  const handleChange = ({ target: { name, value } }) => {
    setUserDetails((prevState) => ({ ...prevState, [name]: value }))
  }

  const isButtonDisabled = () => {
    return !(
      userDetails.lastName &&
      userDetails.firstName &&
      userDetails.portfolioStage
    )
  }

  const onUploadImg = (ev) => {
    setImg(ev.target.files[0])
  }

  const listenToUuid = (uuid) => {
    storageService.putInStorage("uuid", uuid)
    const uuidRef = ref(database, `/uuids/${uuid}`)
    onValue(uuidRef, (snapshot) => {
      const tableId = snapshot.val()
      if (tableId) {
        tableService.setTableIdInStorage(tableId)
        storageService.removeFromStorage("uuid")
        navigate(`table/${tableId}`)
      }
    })
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    setIsLoading(true)

    //set up the user object and call the joinTable api
    try {
      userDetails.imgUrl = img
        ? await cloudinaryService.uploadImg(img)
        : `https://api.dicebear.com/5.x/avataaars-neutral/svg?size=64&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc&eyebrows=default,defaultNatural,raisedExcited,raisedExcitedNatural,upDown,upDownNatural&eyes=closed,xDizzy,winkWacky,wink,surprised,squint,side,hearts,happy,default&mouth=twinkle,tongue,smile,serious,grimace,eating,default&seed=${utilService.makeId(
            5
          )}`
      userDetails.id = await tableService.joinTable(userDetails)

      //sign up for the uuid ref
      listenToUuid(userDetails.id)

      //dispatch the user
      dispatch(setUser(userDetails))
    } catch (err) {
      setIsLoading(false)
      console.error(err)
    }
  }

  const onToggleModal = () => {
    setIsModalOpen((prevState) => !prevState)
  }

  const menuItems = [
    {
      value: "Brainstorming",
      text: "Early idea discussions and exploration",
    },
    {
      value: "Planning & Research",
      text: "Defining goals and user research",
    },
    {
      value: "Design & Composition",
      text: "Organizing and structuring of the design",
    },
    {
      value: "Refinement",
      text: "Polishing and perfecting the final project",
    },
  ]
  
  const classes = useStyles()

  const hebrewSettings = { fontFamily: "assistant-regular", direction: "rtl" }
  const englishSettings = { fontFamily: "poppins-regular", direction: "ltr" }

  const firstNameLangSettings = useMemo(() => {
    return utilService.isInHebrew(userDetails.firstName)
      ? hebrewSettings
      : englishSettings
  }, [userDetails.firstName])

  const lastNameLangSettings = useMemo(() => {
    return utilService.isInHebrew(userDetails.lastName)
      ? hebrewSettings
      : englishSettings
  }, [userDetails.lastName])

  return (
    <section>
      {isLoading ? (
        <Loader massage="Finding you a table, please don't refresh this page" />
      ) : (
        <div className='form'>
          <div className='main-content'>
            <section className='welcome'>
              <div className='logo-container'>
                <img src={logo} alt='logo' />
              </div>
              <h1>
                <span>Welcome</span>
                <br />
                To The Event!
              </h1>
            </section>

            <div className='form-container'>
              <form onSubmit={onSubmit}>
                <input
                  style={{ display: "none" }}
                  type='file'
                  id='profilePicture'
                  name='profilePicture'
                  ref={inputImageRef}
                  onChange={onUploadImg}
                />
                <div
                  className='profile-image'
                  onClick={() => inputImageRef.current.click()}
                >
                  <img src={imgUrl} alt='' />
                  <div className='pencil'></div>
                </div>
                <TextField
                  className={classes.root}
                  value={userDetails.firstName}
                  name='firstName'
                  onChange={handleChange}
                  label='First Name'
                  variant='outlined'
                  inputProps={{
                    style: {
                      height: "48px",
                      padding: "0px 16px",
                      color: "#28293D",
                      fontFamily: `${firstNameLangSettings.fontFamily}`,
                      fontSize: "14px",
                      direction: `${firstNameLangSettings.direction}`,
                    },
                  }}
                  fullWidth={true}
                />
                <TextField
                  className={classes.root}
                  value={userDetails.lastName}
                  name='lastName'
                  onChange={handleChange}
                  label='Last Name'
                  variant='outlined'
                  inputProps={{
                    style: {
                      height: "48px",
                      padding: "0px 16px",
                      color: "#28293D",
                      fontFamily: `${lastNameLangSettings.fontFamily}`,
                      fontSize: "14px",
                      direction: `${lastNameLangSettings.direction}`,
                    },
                  }}
                  fullWidth={true}
                />
                <Box width='100%' className={classes.customBox}>
                  <TextField
                    className={classes.root}
                    select
                    value={userDetails.portfolioStage}
                    onChange={handleChange}
                    name='portfolioStage'
                    label='Portfolio stage'
                    placeholder='Portfolio stage'
                    fullWidth={true}
                  >
                    {menuItems.map((item) => (
                      <MenuItem
                        key={item.value}
                        value={item.value}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          "p.MuiTypography-body2": {
                            display:
                              userDetails.portfolioStage === item.value &&
                              "block",
                          },
                        }}
                      >
                        {item.value}
                        <Typography variant='body2' color='textSecondary'>
                          {item.text}
                        </Typography>
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <button
                  disabled={isButtonDisabled()}
                  type='submit'
                  className='submit-btn'
                >
                  Lets go!
                </button>
              </form>
            </div>
            <div className='event-settings-link' onClick={onToggleModal}>
              <img src={eventSettings} alt='' />
              <p>Event Settings</p>
            </div>
          </div>
          {isModalOpen && (
            <PasswordModal classes={classes} onToggleModal={onToggleModal} />
          )}
        </div>
      )}
    </section>
  )
}
