import { TextField } from '@material-ui/core'
import { useMemo, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import logo from '../assets/imgs/logo@2x.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { joinTable } from '../store/actions/table.action'
import { useEffect } from 'react'
import { cloudinaryService } from '../services/cloudinary.service'

export const FillDetails = () => {
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
  const imgUrl = useMemo(() => {
    return img ? URL.createObjectURL(img) : null
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
      user.imgUrl = img ? await cloudinaryService.uploadImg(img) : null
      dispatch(joinTable(user))
    } catch (err) {
      console.error(err)
    }
  }

  const useStyles = makeStyles({
    root: {
      [`& fieldset`]: {
        borderRadius: 8,
        border: '1px solid #EBEBEB',
      },
      '& .MuiInputLabel-root': {
        fontSize: 14,
        color: '#9899A6',
        fontFamily: 'poppins-regular',
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #EBEBEB',
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #EBEBEB',
      },
    },
  })

  const classes = useStyles()
  return (
    <div className="fill-details">
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
          <form className="form" onSubmit={onSubmit}>
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
              {img && <img src={imgUrl} alt="" />}
              <div className="pencil"></div>
            </div>
            {/* <input
              type="text"
              value={userDetails.firstName}
              name="firstName"
              onChange={handleChange}
              placeholder="First Name"
            /> */}
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
                },
              }}
              fullWidth="100%"
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
                },
              }}
              fullWidth="100%"
            />
            {/* <input
              type="text"
              value={userDetails.lastName}
              name="lastName"
              onChange={handleChange}
              placeholder="Last Name"
            /> */}
            <select
              value={userDetails.portfolioStage}
              onChange={handleChange}
              name="portfolioStage"
            >
              <option value="" disabled>
                Portfolio stage
              </option>
              <option value="Brainstorming">Brainstorming</option>
              <option value="Planning & Research">Planning & Research</option>
              <option value="Design & Composition">Design & Composition</option>
              <option value="Refinement">Refinement</option>
            </select>
            <button
              disabled={isButtonDisabled()}
              type="submit"
              className="submit-btn"
            >
              Lets go!
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
