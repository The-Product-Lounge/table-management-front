import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import lock from '../assets/imgs/lock.svg'
import openEye from '../assets/imgs/open-eye.svg'
import redError from '../assets/imgs/red-error.svg'
import closedEye from '../assets/imgs/closed-eye.svg'

export const PasswordModal = ({ onToggleModal, classes }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [wrongPassword, setWrongPassword] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleChange = (event) => {
    setPasswordInput(event.target.value)
  }

  const onCheckPassword = (event) => {
    event.preventDefault()
    if (passwordInput === process.env.REACT_APP_ADMIN_PASSWORD) {
      navigate('/event-settings')
    } else {
      console.log('aaa')
      setWrongPassword(true)
      inputRef.current.blur()
    }
  }

  const isButtonDisabled = () => {
    return !passwordInput
  }

  return (
    <div className="screen" onClick={onToggleModal}>
      <section
        className="password-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <img src={lock} alt="lock" className="lock" />
        <h1>Wait!</h1>
        <p className="subtitle">What is the secret word?</p>
        <form onSubmit={onCheckPassword}>
          <TextField
            className={classes.root}
            error={wrongPassword}
            helperText={
              wrongPassword && (
                <span className="helper-text-container">
                  <img className="red-error" src={redError} alt="red-error" />
                  <span>Incorrect password, are you a spy?</span>
                </span>
              )
            }
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            variant="outlined"
            value={passwordInput}
            onChange={handleChange}
            inputRef={inputRef}
            InputProps={{
              style: {
                height: '48px',
                padding: '0px 10px',
                color: '#28293D',
                fontFamily: 'poppins-regular',
                fontSize: '14px',
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? (
                      <img src={closedEye} alt="closed eye" />
                    ) : (
                      <img src={openEye} alt="open eye" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiFormHelperText-root': {
                color: '#555770 !important',
                position: 'absolute',
                fontSize: '11px',
                fontFamily: 'inter-regular !important',
                bottom: '-21px',
              },
            }}
            fullWidth={true}
          />
          <button
            disabled={isButtonDisabled()}
            type="submit"
            className="modal-btn black"
          >
            Open sesami!
          </button>
        </form>
        <button onClick={onToggleModal} className="modal-btn white">
          Cancel
        </button>
      </section>
    </div>
  )
}
