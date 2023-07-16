"use client";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";
import React, { ReactNode, useState } from "react";

import openEye from "@/old/assets/imgs/open-eye.svg";
import closedEye from "@/old/assets/imgs/closed-eye.svg";
import redError from "@/old/assets/imgs/red-error.svg";
import Image from "next/image";

// TODO separate this component to a new file
const HelperTextError = ({ children }: { children: ReactNode }) => {
  return (
    <Stack direction="row" alignItems="center">
      <Image
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

//extend mui textfield props
type TextFieldProps = {} & MuiTextFieldProps;

/**
 * TextField - A component that renders a text field from material ui,
 * with a show password icon for password fields
 */
export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  (props: TextFieldProps, ref) => {
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
                      <Image src={closedEye} alt="closed eye" />
                    ) : (
                      <Image src={openEye} alt="open eye" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      </>
    );
  }
);

TextField.displayName = "TextField";
