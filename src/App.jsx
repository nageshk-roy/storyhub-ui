
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Explore from "./pages/Explore"
import ArticleDetails from "./pages/ArticleDetails"
import WriteArticle from "./pages/WriteArticle"
import Bookmarks from "./pages/Bookmarks"
import CreatorProfile from "./pages/CreatorProfile"
import Dashboard from "./pages/Dashboard"
import Search from "./pages/Search"
import Notifications from "./pages/Notifications"
import Settings from "./pages/Settings"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import { Toaster } from "react-hot-toast"

function App(){

return(
    <>
<Toaster position="top-right"/>
<BrowserRouter>

<Navbar/>

<Routes>

<Route path="/" element={<Home/>}/>

<Route path="/explore" element={<Explore/>}/>

<Route path="/write" element={<WriteArticle/>}/>

<Route path="/article/:id" element={<ArticleDetails/>}/>

<Route path="/profile" element={<Profile/>}/>

<Route path="/creator/:id" element={<CreatorProfile/>}/>

<Route path="/bookmarks" element={<Bookmarks/>}/>

<Route path="/dashboard" element={
<ProtectedRoute>
<Dashboard/>
</ProtectedRoute>
}/>

<Route path="/search" element={<Search/>}/>

<Route path="/notifications" element={<Notifications/>}/>

<Route path="/settings" element={<Settings/>}/>

<Route path="/login" element={<Login/>}/>

<Route path="/register" element={<Register/>}/>

</Routes>

</BrowserRouter>
</>

)

}

export default App

