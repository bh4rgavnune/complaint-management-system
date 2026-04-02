import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SubmitComplaint from './pages/SubmitComplaint'
import TrackComplaint from './pages/TrackComplaint'
import AdminDashboard from './pages/AdminDashboard'
import Reports from './pages/Reports'
import './styles/global.css'
import './styles/layout.css'
import './styles/components.css'

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<SubmitComplaint />} />
          <Route path="/track" element={<TrackComplaint />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App