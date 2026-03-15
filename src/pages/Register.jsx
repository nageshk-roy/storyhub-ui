import { useState, useEffect } from "react"
import api from "../services/api"
import { useNavigate, Link } from "react-router-dom"
import toast from "react-hot-toast"

function Register(){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)

const navigate = useNavigate()

useEffect(()=>{

const token = localStorage.getItem("token")

if(token){
navigate("/dashboard")
}

},[])

const validateEmail = (email) => {
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const handleRegister = async(e)=>{

e.preventDefault()

if(!name.trim()){
toast.error("Name is required")
return
}

if(name.length < 3){
toast.error("Name must be at least 3 characters")
return
}

if(!email){
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

await api.post("/auth/register",{name,email,password})

toast.success("Registration successful")

navigate("/login")

}catch(err){

const message =
err?.response?.data?.message || "User already registered"

toast.error(message)

}finally{

setLoading(false)

}

}

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-8 rounded-xl shadow-md w-96">

<h2 className="text-2xl font-bold text-center mb-6">
Create Account
</h2>

<form onSubmit={handleRegister}>

<input
placeholder="Full Name"
className="w-full border p-3 rounded mb-4"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

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
{loading ? "Creating account..." : "Register"}
</button>

</form>

<p className="text-center text-sm text-gray-600 mt-4">
Already have an account?
<Link to="/login" className="text-blue-600 ml-1">
Login
</Link>
</p>

</div>
</div>
)

}

export default Register