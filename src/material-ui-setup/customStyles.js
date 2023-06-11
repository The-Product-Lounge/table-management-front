import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles({
  customBox: {
    height: "48px",
  },

  root: {
    "& label.Mui-focused": {
      color: "#1C1C29",
    },
    [`& fieldset`]: {
      borderRadius: 8,
      border: "1px solid #EBEBEB",
      height: "53px",
    },
    "& svg.MuiSvgIcon-root": {
      top: "calc(50% - 0.6em)",
    },
    "& div.MuiInputBase-root": {
      fontFamily: "poppins-regular",
      color: "#28293D",
      fontSize: "14px",
    },
    "& .MuiInputLabel-root": {
      lineHeight: "unset",
      fontSize: 14,
      color: "#9899A6",
      fontFamily: "poppins-regular",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #1C1C29",
      color: "#9899A6",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #1C1C29",
      color: "black",
    },
  },

  textarea: {
    borderRadius: 8,
    border: "1px solid #EBEBEB",
    height: "53px",
    minHeight:"98px",
    padding: "14px 16px"
  },
})

export const inputProps = {
  style: {
    height: "48px",
    padding: "0px 16px",
    color: "#28293D",
    fontSize: "14px",
  }
}
