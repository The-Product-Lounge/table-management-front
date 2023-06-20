import "./assets/styles/main.scss";
import { Route, Routes } from "react-router-dom";
import { Form } from "./views/Form";
import { TableView } from "./views/TableView";
import { EventSettings } from "./views/EventSettings";
import { Login } from "./views/Login";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="" element={<Form />} />
        <Route path="event-settings" element={<EventSettings />} />
        <Route path="table/:tableId" element={<TableView />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
