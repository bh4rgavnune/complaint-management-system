import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SubmitComplaint from './pages/SubmitComplaint'
import TrackComplaint from './pages/TrackComplaint'
import AdminDashboard from './pages/AdminDashboard'
import Reports from './pages/Reports'
import Login from './pages/Login'
import Register from './pages/Register'
import MyComplaints from './pages/MyComplaints'
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-complaints" element={<MyComplaints />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App