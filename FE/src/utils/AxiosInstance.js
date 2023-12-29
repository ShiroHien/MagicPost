import axios from 'axios'
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode"

// Tạo instance của Axios
const axiosInstance = axios.create()

// Tạo interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('jwt')

    // Kiểm tra xem token có tồn tại và chưa hết hạn hay không
    if (token) {
      const decodedToken = jwtDecode(token)
      const currentTime = Date.now() / 1000

      // if (decodedToken.exp < currentTime) {
      //   // Token đã hết hạn, điều hướng người dùng về trang đăng nhập
      //   window.location.href = '/taoin'
      //   return new Promise(() => {})
      // }

      // Thêm token vào header của mỗi yêu cầu
      config.headers.Authorization = `${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default axiosInstance