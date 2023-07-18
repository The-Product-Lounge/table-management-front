import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontFamily: "'poppins-regular', sans-serif",
    allVariants: {
      lineHeight: 1,
      letterSpacing: "0.15px",
    },
    button: { textTransform: "none" },
  },
  palette: {
    primary: {
      main: "#28293D",
    },
    error: {
      main: "#FF3B3B",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "&.Mui-disabled": {
            backgroundColor: "#E4E4EB",
            borderColor: "#EBEBEB",
            border: "1px",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiFormHelperText-root.Mui-error": {
            color: "#555770",
            fontFamily: "poppins-regular",
            fontSize: "12px",
          },
          "& label.Mui-focused": {
            color: "#1C1C29",
          },
          [`& fieldset`]: {
            borderRadius: "8px",
            border: "1px solid #EBEBEB",
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
            fontSize: 14,
            color: "#9899A6",
            fontFamily: "poppins-regular",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: "1px solid #1C1C29",
              color: "#9899A6",
            },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #1C1C29",
            color: "black",
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);
export { theme };
