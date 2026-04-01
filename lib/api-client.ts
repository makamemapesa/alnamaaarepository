import axios from "axios"
import { getTokens, setTokens, clearTokens } from "./auth"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// ─── Case converters ───────────────────────────────────────────────────────────
function toCamel(s: string) {
  return s.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
}
function toSnake(s: string) {
  return s.replace(/([A-Z])/g, "_$1").toLowerCase()
}
function convertKeys(obj: unknown, fn: (s: string) => string): unknown {
  if (Array.isArray(obj)) return obj.map((v) => convertKeys(v, fn))
  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([k, v]) => [fn(k), convertKeys(v, fn)])
    )
  }
  return obj
}

// ─── Axios instance ────────────────────────────────────────────────────────────
export const api = axios.create({ baseURL: BASE_URL })

// Attach JWT + convert request body to snake_case
api.interceptors.request.use((config) => {
  const tokens = getTokens()
  if (tokens?.access) {
    config.headers.Authorization = `Bearer ${tokens.access}`
  }
  if (config.data && typeof config.data === "object" && !(config.data instanceof FormData)) {
    config.data = convertKeys(config.data, toSnake)
  }
  return config
})

// Convert response to camelCase + handle 401
api.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = convertKeys(response.data, toCamel)
    }
    return response
  },
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      const tokens = getTokens()
      if (tokens?.refresh) {
        try {
          const res = await axios.post(`${BASE_URL}/api/auth/token/refresh/`, {
            refresh: tokens.refresh,
          })
          setTokens(res.data.access, tokens.refresh)
          original.headers.Authorization = `Bearer ${res.data.access}`
          return api(original)
        } catch {
          clearTokens()
          window.location.href = "/login"
        }
      } else {
        clearTokens()
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  }
)

// ─── Helpers ───────────────────────────────────────────────────────────────────
/** Extract results array from DRF paginated response or plain array */
export function getResults<T>(data: { results?: T[] } | T[]): T[] {
  if (Array.isArray(data)) return data
  return data.results ?? []
}
