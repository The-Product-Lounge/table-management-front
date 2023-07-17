import { IconButton, InputAdornment, Stack } from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import React, { useState } from "react";

import openEye from "../../assets/imgs/open-eye.svg";
import closedEye from "../../assets/imgs/closed-eye.svg";
import redError from "../../assets/imgs/red-error.svg";

const HelperTextError = ({ children }) => {
  return (
    <Stack direction="row" alignItems="center">
      <img
        src={redError}
        alt="red-error"
        style={{
          width: 16,
          height: 16,
        }}
      />
      {children}
    </Stack>
  );
};

/**
 * TextField - A component that renders a text field from material ui,
 * with a show password icon for password fields
 */
export const TextField = React.forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  let reProps = { ...props };
  const helperText = reProps.helperText;

  if (helperText && props.error) {
    reProps.helperText = <HelperTextError>{helperText}</HelperTextError>;
  }

  return (
    <>
      {props.type !== "password" ? (
        <MuiTextField ref={ref} {...reProps} />
      ) : (
        <MuiTextField
          ref={ref}
          {...reProps}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(event) => event.preventDefault()}
                  edge="end"
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
        />
      )}
    </>
  );
});

TextField.name = "TextField";
