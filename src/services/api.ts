import env from '@/environments'
import axios from 'axios'

const api = axios.create({
  baseURL: env.domain,
  timeout: 180000
})

export default api
