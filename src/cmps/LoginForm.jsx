import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button } from "./inputs/Button";
import { TextField } from "./inputs/TextField";

export const LoginForm = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({ resolver: yupResolver(validationSchema) });

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
          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register("email")}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
          />
        </Grid>
        <Grid item xs={4} width={0.8}>
          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register("password")}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
          />
        </Grid>

        <Grid item xs={2}>
          <Button
            variant="contained"
            size="large"
            sx={{
              fontFamily: "poppins-semi-bold",
              fontSize: "14px",
              px: "50px",
              py: "15px",
            }}
            disabled={!isDirty}
            onClick={handleSubmit((data) => console.log(data, isDirty))}
            label="Open sesami!"
            isLoading={isSubmitting}
          />
        </Grid>
      </Grid>
    </form>
  );
};
