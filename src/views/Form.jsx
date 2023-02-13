import { useMemo, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import logo from '../assets/imgs/logo@2x.png'
import infoCircle from '../assets/imgs/infocircle.svg'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { joinTable } from '../store/actions/table.action'
import { useEffect } from 'react'
import { cloudinaryService } from '../services/cloudinary.service'
import { Box, MenuItem, TextField } from '@mui/material'
import { utilService } from '../services/util.service'

export const Form = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    portfolioStage: '',
  })
  const [img, setImg] = useState(null)
  const inputImageRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const table = useSelector((state) => state.tableModule.table)
  const defaultUserImg =
    'http://res.cloudinary.com/table-management/image/upload/v1675882239/owrihwaxfhqlg1oneqxr.png'

  const imgUrl = useMemo(() => {
    return img ? URL.createObjectURL(img) : defaultUserImg
  }, [img])

  useEffect(() => {
    if (table) navigate(`table/${table._id}`)
  }, [table, navigate])

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

  const onSubmit = async (ev) => {
    ev.preventDefault()
    const user = { ...userDetails }
    try {
      user.imgUrl = img
        ? await cloudinaryService.uploadImg(img)
        : defaultUserImg
      dispatch(joinTable({ ...user, id: utilService.makeId() }))
    } catch (err) {
      console.error(err)
    }
  }

  const useStyles = makeStyles({
    customBox: {
      height: '48px',
    },

    root: {
      '& label.Mui-focused': {
        color: '#1C1C29',
      },
      [`& fieldset`]: {
        borderRadius: 8,
        border: '1px solid #EBEBEB',
        height: '53px',
      },

      '& .MuiInputLabel-root': {
        fontSize: 14,
        color: '#9899A6',
        fontFamily: 'poppins-regular',
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #1C1C29',
        color: '#9899A6',
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #1C1C29',
        color: 'black',
      },
    },
  })

  const classes = useStyles()
  return (
    <div className="form">
      <div className="main-content">
        <section className="welcome">
          <div className="logo-container">
            <img src={logo} alt="logo" />
          </div>
          <h1>
            <span>Welcome</span>
            <br />
            To The Event!
          </h1>
        </section>

        <div className="form-container">
          <form onSubmit={onSubmit}>
            <input
              style={{ display: 'none' }}
              type="file"
              id="profilePicture"
              name="profilePicture"
              ref={inputImageRef}
              onChange={onUploadImg}
            />
            <div
              className="profile-image"
              onClick={() => inputImageRef.current.click()}
            >
              <img src={imgUrl} alt="" />
              <div className="pencil"></div>
            </div>
            <TextField
              className={classes.root}
              value={userDetails.firstName}
              name="firstName"
              onChange={handleChange}
              label="First Name"
              variant="outlined"
              inputProps={{
                style: {
                  height: '48px',
                  padding: '0px 16px',
                  color: '#28293D',
                  fontFamily: 'poppins-regular',
                  fontSize: '14px',
                },
              }}
              fullWidth={true}
            />
            <TextField
              className={classes.root}
              value={userDetails.lastName}
              name="lastName"
              onChange={handleChange}
              label="Last Name"
              variant="outlined"
              inputProps={{
                style: {
                  height: '48px',
                  padding: '0px 16px',
                  color: '#28293D',
                  fontFamily: 'poppins-regular',
                  fontSize: '14px',
                },
              }}
              fullWidth={true}
            />
            <Box width="100%" className={classes.customBox}>
              <TextField
                className={classes.root}
                select
                value={userDetails.portfolioStage}
                onChange={handleChange}
                name="portfolioStage"
                label="Portfolio stage"
                placeholder="Portfolio stage"
                fullWidth={true}
              >
                <MenuItem value="" disabled>
                  Portfolio stage
                </MenuItem>
                <MenuItem value="Brainstorming">Brainstorming</MenuItem>
                <MenuItem value="Planning & Research">
                  Planning & Research
                </MenuItem>
                <MenuItem value="Design & Composition">
                  Design & Composition
                </MenuItem>
                <MenuItem value="Refinement">Refinement</MenuItem>
              </TextField>
            </Box>

            <button
              disabled={isButtonDisabled()}
              type="submit"
              className="submit-btn"
            >
              Lets go!
            </button>
          </form>
        </div>
        <Link to="/event-info">
          <div className="event-info-link">
            <img src={infoCircle} alt="" />
            <p>Event Info</p>
          </div>
        </Link>
      </div>
    </div>
  )
}