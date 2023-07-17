import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import logo from "../../old/assets/imgs/logo@2x.png";
import { Box } from "@mui/material";
import bgImage from "../../old/assets/imgs/bgimage.svg?url";
import { LoginForm } from "@/lib/components/LoginForm";
import { ReactNode } from "react";
import Image from "next/image";

/**
 * BackgroundComponent - A component that renders a background image
 *
 */
const BackgroundComponent = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        background: `#fafafa url(${bgImage.src}) center;`,
      }}
    >
      {children}
    </Box>
  );
};

/**
 * LogoCardComponent - A component that renders a card with the logo
 */
const LogoCardComponent = () => {
  return (
    <Card
      elevation={5}
      sx={{
        borderRadius: "12px",
        borderBlockColor: "#E0E0E0",
        position: "absolute",
        width: 68,
        height: 68,
        left: "50%",
        right: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Image
        src={logo}
        alt="logo"
        style={{
          display: "block",
          width: 26,
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </Card>
  );
};

/**
 * TitleComponent - A component that renders a title and subtitle
 */
const TitleComponent = () => {
  return (
    <>
      <Typography
        variant="h2"
        fontSize={16}
        fontFamily={"poppins-bold"}
        align="center"
        color={"#1C1C28"}
      >
        Wait!
      </Typography>

      <Typography
        variant="subtitle1"
        fontSize={14}
        fontFamily={"poppins-regular"}
        align="center"
        color={"#555770"}
      >
        What is the secret word?
      </Typography>
    </>
  );
};

const Login = () => {
  return (
    <BackgroundComponent>
      {/* Center elements to the middle of the screen horizontally */}
      <Grid container justifyContent={"center"} alignItems={"center"}>
        {/* Keeping space from the screen border on the left and right side */}
        <Grid item xs={11}>
          <Card
            elevation={1}
            sx={{
              height: 399,
              borderRadius: "16px",
              borderColor: "#EBEBEB",
            }}
            square={false}
          >
            <LogoCardComponent />
            {/* Grid of vertical positioning*/}
            <Grid
              height={1}
              container
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {/* Empty grid for spacing */}
              <Grid item xs={2}></Grid>
              <Grid item xs={2}>
                <TitleComponent />
              </Grid>
              <Grid item xs={8} width={1}>
                <LoginForm />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </BackgroundComponent>
  );
};
export default Login;
