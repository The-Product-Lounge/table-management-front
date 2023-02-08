import { useMemo, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import logo from '../assets/imgs/logo@2x.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { joinTable } from '../store/actions/table.action'
import { useEffect } from 'react'
import { cloudinaryService } from '../services/cloudinary.service'
import { Box, MenuItem, TextField } from '@mui/material'

export const EventInfo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const table = useSelector((state) => state.tableModule.table)

  useEffect(() => {}, [])

  const onRemoveLounger = (ev) => {}

  const onClearEvent = async (ev) => {
    // TODO: A method to clear event details
  }

  return <div className="event-info">Event Info</div>
}
