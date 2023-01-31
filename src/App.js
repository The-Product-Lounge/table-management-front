import './assets/styles/main.scss'
import { Route, Routes } from 'react-router-dom'
import { FillDetails } from './views/FillDetails'
import { Table } from './views/Table'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<FillDetails />} />
        <Route path="table/:tableId" element={<Table />} />
      </Routes>
    </div>
  )
}

export default App
