import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import logo from "../assets/imgs/logo@2x.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import bgImage from "../assets/imgs/bgimage.svg";

export const Login = () => {
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
        background: `#fafafa url(${bgImage}) center;`,
      }}
    >
      <Grid container justifyContent={"center"} alignItems={"center"}>
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
              <img
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
            <Grid
              height={1}
              container
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid item xs={2}></Grid>
              <Grid item xs={2}>
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
              </Grid>
              <Grid item xs={8} width={1}>
                <form>
                  <Grid
                    container
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    spacing={4}
                  >
                    <Grid item xs={4} width={0.8}>
                      <TextField
                        label="Email"
                        type="email"
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={4} width={0.8}>
                      <TextField
                        label="Password"
                        type="password"
                        fullWidth
                      ></TextField>
                    </Grid>

                    <Grid item xs={2}>
                      <Button
                        variant="contained"
                        size="large"
                        disabled
                        sx={{
                          fontFamily: "poppins-semi-bold",
                          fontSize: "14px",
                          px: "50px",
                          py: "15px",
                        }}
                      >
                        Open sesami!
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
