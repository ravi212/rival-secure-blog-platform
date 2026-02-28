import axiosInstance from "@/config/axios";
import { ENDPOINTS } from "@/constants/endpoints";

/**
 * Setup axios interceptors for auth flow
 * This should be called after auth context is initialized
 */
export const setupAuthInterceptors = (
  getToken: () => string | null,
  handleLogout: () => void
) => {
  // Request interceptor
  const requestInterceptor = axiosInstance.interceptors.request.use(
    (config) => {
      // Skip auth for certain endpoints
      if (config.headers.auth === false) {
        delete config.headers.auth;
        return config;
      }

      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  const responseInterceptor = axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle 401 Unauthorized
      if (error.response?.status === 401) {
        // Token is invalid or expired
        handleLogout();

        // Redirect to login if not already there
        if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      }

      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      return Promise.reject(new Error(message));
    }
  );

  // Return cleanup function to eject interceptors
  return () => {
    axiosInstance.interceptors.request.eject(requestInterceptor);
    axiosInstance.interceptors.response.eject(responseInterceptor);
  };
};

/**
 * Clear auth headers from axios
 */
export const clearAuthHeaders = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};
