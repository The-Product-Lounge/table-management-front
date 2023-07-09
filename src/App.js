import "./assets/styles/main.scss";
import { Route, Routes } from "react-router-dom";
import { Form } from "./views/Form";
import { TableView } from "./views/TableView";
import { EventSettings } from "./views/EventSettings";
import { Login } from "./views/Login";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./views/PrivateRoutes";

function App() {
  const jwt_token = useSelector((state) => state.authModule.jwt_token);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="" element={<Form />} />
        <Route element={<ProtectedRoute isAllowed={!!jwt_token} />}>
          <Route path="event-settings" element={<EventSettings />} />
        </Route>
        <Route path="table/:tableId" element={<TableView />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
