import axiosInstance from "@/config/axios";

export const apiClient = {
  get: <T>(url: string, config = {}) =>
    axiosInstance.get<T>(url, config).then(res => res.data),

  post: <T>(url: string, data?: unknown, config = {}) =>
    axiosInstance.post<T>(url, data, config).then(res => res.data),

  put: <T>(url: string, data?: unknown, config = {}) =>
    axiosInstance.put<T>(url, data, config).then(res => res.data),

  delete: <T>(url: string, config = {}) =>
    axiosInstance.delete<T>(url, config).then(res => res.data),

  patch: <T>(url: string, data?: unknown, config = {}) =>
    axiosInstance.patch<T>(url, data, config).then(res => res.data),
};