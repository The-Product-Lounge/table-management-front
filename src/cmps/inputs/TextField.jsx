import { IconButton, InputAdornment } from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import React, { useState } from "react";

import openEye from "../../assets/imgs/open-eye.svg";
import closedEye from "../../assets/imgs/closed-eye.svg";

/**
 * TextField - A component that renders a text field from material ui,
 * with a show password icon for password fields
 */
export const TextField = React.forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {props.type !== "password" ? (
        <MuiTextField ref={ref} {...props} />
      ) : (
        <MuiTextField
          ref={ref}
          {...props}
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
