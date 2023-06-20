import { Button, Grid, TextField } from "@mui/material";

export const LoginForm = () => {
  return (
    <form>
      <Grid
        container
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
      >
        <Grid item xs={4} width={0.8}>
          <TextField label="Email" type="email" fullWidth></TextField>
        </Grid>
        <Grid item xs={4} width={0.8}>
          <TextField label="Password" type="password" fullWidth></TextField>
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
  );
};
