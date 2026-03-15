import { useState } from "react"
import api from "../services/api"
import { useNavigate, Link } from "react-router-dom"
import toast from "react-hot-toast"

function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleLogin = async (e) => {

    e.preventDefault()

    if(!email.trim()){
      toast.error("Email is required")
      return
    }

    if(!validateEmail(email)){
      toast.error("Please enter a valid email")
      return
    }

    if(!password){
      toast.error("Password is required")
      return
    }

    if(password.length < 6){
      toast.error("Password must be at least 6 characters")
      return
    }

    try{

      setLoading(true)

      const res = await api.post("/auth/login",{ email,password })

      const token = res.data?.data?.token

      if(!token){
        toast.error("Invalid login response")
        return
      }

      localStorage.setItem("token",token)

      toast.success("Login successful")

      navigate("/dashboard")

    }catch(err){

      const message =
        err?.response?.data?.message || "Invalid email or password"

      toast.error(message)

    }finally{

      setLoading(false)

    }

  }

  return(

  <div className="min-h-screen flex items-center justify-center bg-gray-100">

  <div className="bg-white p-8 rounded-xl shadow-md w-96">

  <h2 className="text-2xl font-bold text-center mb-6">
  Login to StoryHub
  </h2>

  <form onSubmit={handleLogin}>

  <input
  type="email"
  placeholder="Email"
  className="w-full border p-3 rounded mb-4"
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
  />

  <input
  type="password"
  placeholder="Password"
  className="w-full border p-3 rounded mb-4"
  value={password}
  onChange={(e)=>setPassword(e.target.value)}
  />

  <button
  type="submit"
  disabled={loading}
  className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
  >
  {loading ? "Logging in..." : "Login"}
  </button>

  </form>

  <p className="text-center text-sm text-gray-600 mt-4">
  Don't have an account?
  <Link to="/register" className="text-blue-600 ml-1">
  Register
  </Link>
  </p>

  </div>
  </div>
  )
}

export default Login