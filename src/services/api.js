import axios from 'axios'

// Para la url del api con el .env
const api = axios.create({
baseURL: import.meta.env.API_URL
})

export default api