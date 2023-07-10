export const stylesX = {
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

  height: {
    [`& fieldset`]: {
      height: "auto",
    },
  },

  datePicker: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        padding: "0px",
        border: "1px solid #EBEBEB",
        fontFamily: "poppins-regular",
        color: "#28293D",
        fontSize: "14px",
        borderRadius: 8,
      },
      "&.Mui-focused fieldset": {
        border: "1px solid #1C1C29",
      },
    },
    "& .MuiFormLabel-root": {
      color: "#9899A6",
      fontFamily: "poppins-regular",
      "&.Mui-focused": {
        color: "#28293D",
      },
    },
    "& .MuiIconButton-root": {
      "& svg": {
        color: "#28293D",
      },
    },
    "& .MuiButtonBase-root": {
      border: "none",
      boxShadow: "none",
      borderRadius: "50%",
      padding: "6px",
      marginRight: "-12px",
      // fontSize: '14px',
    },
    ".css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
      fontFamily: "poppins-regular",
    },
    "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
      height: "48px",
      padding: "0 16px",
    },

    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
      top: "-2px",
    },
  },
};

export const customHeight = {
  height: "48px",
};

export const inputProps = {
  style: {
    height: "48px",
    padding: "0px 16px",
    color: "#28293D",
    fontSize: "14px",
  },
};
