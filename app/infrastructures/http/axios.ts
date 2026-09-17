import axios from 'axios'
import { ApiErrors } from './api-errors'


const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
    timeout: 320000,
})

axiosInstance.interceptors.response.use(
  response => {
    // console.log('[AXIOS OK]', {
    //   status: response.status,
    //   url: response.config.url,
    // })

    return response
  },

  error => {
    console.error('[AXIOS ERROR]', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method,
      response: error.response,
      detaiL:error
    })

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
          error.message
        )
      )
    }

    return Promise.reject(
      new ApiErrors(-1, error.message)
    )
  }
)


export default axiosInstance
/* ============================
 * RESPONSE INTERCEPTOR
 * ============================ */
// axiosInstance.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response) {
//         console.log(error)
//         return Promise.reject(
//             new ApiErrors(
//             error.response.status,
//             error.response.data?.message ?? 'Server error',
//             error.response.data
//             )
//         )
//     }

//     if (error.request) {
//         return Promise.reject(
//             new ApiErrors(
//             0,
//             error,
//             )
//         )
//     }

//     return Promise.reject(
//         new ApiErrors(-1, error.message)
//     )
//   }
// )

