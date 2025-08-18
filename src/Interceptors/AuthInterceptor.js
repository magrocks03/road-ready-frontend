import axios from "axios";

// This function will be called before every request is sent
const requestInterceptor = (config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    // If a token exists in session storage, add it to the Authorization header
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

// This handles errors on the response
const responseErrorInterceptor = (error) => {
  // You can add logic here to handle global errors, like a 401 Unauthorized
  // For now, we'll just pass the error along
  return Promise.reject(error);
}

// Register the interceptor with Axios
axios.interceptors.request.use(requestInterceptor);
axios.interceptors.response.use(response => response, responseErrorInterceptor);

export default axios;