import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token")
console.log("Token in ProtectedRoute:", token) // Debugging line
  if (!token) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute