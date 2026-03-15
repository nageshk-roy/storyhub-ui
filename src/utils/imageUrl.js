const BASE_URL = "http://localhost:8001"

export const getImageUrl = (path) => {
  if (!path) return null

  // if already full URL
  if (path.startsWith("http")) {
    return path
  }

  return `${BASE_URL}${path}`
}