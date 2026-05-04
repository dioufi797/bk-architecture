import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : '/api'

const api = axios.create({ baseURL, timeout: 30000 })

api.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('bk_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
