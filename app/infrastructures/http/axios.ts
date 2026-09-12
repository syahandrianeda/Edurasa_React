import axios from 'axios'
import { ApiErrors } from './api-errors'


const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
    timeout: 720000,
})

/* ============================
 * RESPONSE INTERCEPTOR
 * ============================ */
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
        return Promise.reject(
            new ApiErrors(
            error.response.status,
            error.response.data?.message ?? 'Server error',
            error.response.data
            )
        )
    }

    if (error.request) {
        return Promise.reject(
            new ApiErrors(
            0,
            error,
            )
        )
    }

    return Promise.reject(
        new ApiErrors(-1, error.message)
    )
  }
)

export default axiosInstance
