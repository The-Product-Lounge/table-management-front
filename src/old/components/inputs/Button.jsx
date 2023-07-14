import MuiButton from "@mui/material/Button";
import { CircularProgress } from "@mui/material";

/**
 * Button - A component that renders a button from material ui with a loading state
 * @param {boolean} isLoading - A boolean that indicates if the button is loading
 * @param {string} label - The label of the button
 * @param {any} rest - The rest of the props for material ui button
 * @returns {JSX.Element}
 */
export const Button = ({ isLoading, label, ...rest }) => {
  return (
    <MuiButton {...rest} disabled={isLoading || rest.disabled}>
      {isLoading ? <CircularProgress size={24} /> : label}
    </MuiButton>
  );
};
