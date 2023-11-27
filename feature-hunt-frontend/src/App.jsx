import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage'
import { DashboardPage } from './Pages/DashboardPage/DashboardPage';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App