import { createContext, useContext, useState } from "react"
import api from "../services/api"

const AuthContext = createContext()

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)

  const login = async (email, password) => {

    const res = await api.post("/auth/login", {
      email,
      password
    })

    const token = res.data.token
console.log("token:::::", token)
    localStorage.setItem("token", token)

    setUser(res.data.user)

  }

  const logout = () => {

    localStorage.removeItem("token")

    setUser(null)

  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}