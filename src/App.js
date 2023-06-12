import './assets/styles/main.scss'
import { Route, Routes } from 'react-router-dom'
import { Form } from './views/Form'
import { TableView } from './views/TableView'
import { EventSettings } from './views/EventSettings'
import { EventsView } from './views/EventsView'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <Routes>
          {/* <Route path="" element={<Form />} /> */}
          <Route path="" element={<EventsView />} />
          <Route path="event-settings" element={<EventSettings />} />
          <Route path="table/:tableId" element={<TableView />} />
        </Routes>
      </div>
    </LocalizationProvider>
  )
}

export default App
