const BASE_URL = "https://storyhub-backend-1.onrender.com"

export const getImageUrl = (path) => {
  if (!path) return null

  // if already full URL
  if (path.startsWith("http") || path.startsWith("https")) {
    return path
  }

  return `${BASE_URL}${path}`
}