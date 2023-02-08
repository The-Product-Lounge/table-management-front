import './assets/styles/main.scss'
import { Route, Routes } from 'react-router-dom'
import { Form } from './views/Form'
import { Table } from './views/Table'
import { EventInfo } from './views/EventInfo'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Form />} />
        <Route path="event-info" element={<EventInfo />} />
        <Route path="table/:tableId" element={<Table />} />
      </Routes>
    </div>
  )
}

export default App
