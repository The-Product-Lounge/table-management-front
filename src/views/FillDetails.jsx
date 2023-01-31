import { TextField } from '@material-ui/core'
import { useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import logo from '../assets/imgs/logo@2x.png'

export const FillDetails = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    portfolioStage: '',
    imgUrl: '',
  })
  const inputImageRef = useRef()

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

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiInputLabel-root': {
        fontSize: 14,
        color: '#9899A6',
        fontFamily: 'poppins-regular',
        borderRadius: '20px',
      },
    },
  }))

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
          <form className="form">
            <input
              style={{ display: 'none' }}
              type="file"
              id="profilePicture"
              name="profilePicture"
              ref={inputImageRef}
            />
            <div
              className="profile-image"
              onClick={() => inputImageRef.current.click()}
            >
              {userDetails.imgUrl && <img src={userDetails.imgUrl} alt="" />}
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
