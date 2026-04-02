import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Get all complaints
export const getComplaints = async () => {
  const response = await api.get('/complaints')
  return response.data
}

// Get single complaint by ID
export const getComplaintById = async (id) => {
  const response = await api.get(`/complaints/${id}`)
  return response.data
}

// Create a new complaint
export const createComplaint = async (data) => {
  const response = await api.post('complaints', data)
  return response.data
}

// Update complaint status
export const updateComplaintStatus = async (id, status) => {
  const response = await api.patch(`/complaints/${id}`, { status })
  return response.data
}

export default api