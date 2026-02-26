import axios from 'axios'

// Para la url del api con el .env
const api = axios.create({
baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000'
})

export default api