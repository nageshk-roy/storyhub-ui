import { Link, useNavigate } from "react-router-dom"
import { Bell, User, PenSquare, Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"

function Navbar() {

  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {

    const savedTheme = localStorage.getItem("theme")

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
      setDarkMode(true)
    }

  }, [])

  const toggleTheme = () => {

    if (darkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }

    setDarkMode(!darkMode)
  }

  const handleWrite = () => {
    if (!token) {
      navigate("/login")
    } else {
      navigate("/write")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (

    <nav className="border-b bg-white dark:bg-gray-900 dark:border-gray-700 sticky top-0 z-50">

      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold dark:text-white"
        >
          StoryHub
        </Link>

        {/* Center Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm dark:text-gray-200">
          {token && (
            <Link to="/" className="hover:text-black dark:hover:text-white">
              Home
            </Link>
          )}
          <Link
            to="/explore"
            className="hover:text-black dark:hover:text-white"
          >
            Explore
          </Link>

          <button
            onClick={handleWrite}
            className="flex items-center gap-1 hover:text-black dark:hover:text-white"
          >
            <PenSquare size={16} />
            Write
          </button>

          {token && (
            <>


              <Link to="/dashboard" className="hover:text-black dark:hover:text-white">
                Dashboard
              </Link>

              <Link to="/bookmarks" className="hover:text-black dark:hover:text-white">
                Bookmarks
              </Link>
            </>
          )}

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {token && (
            <Link to="/notifications">
              <Bell size={20} className="dark:text-white"/>
            </Link>
          )}

          {token && (
            <Link to="/profile">
              <User size={20} className="dark:text-white"/>
            </Link>
          )}

          {!token && (
            <Link
              to="/login"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Login
            </Link>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}

          <button onClick={toggleTheme}>
            {darkMode ? (
              <Sun size={20} className="dark:text-white"/>
            ) : (
              <Moon size={20}/>
            )}
          </button>

        </div>

      </div>

    </nav>

  )
}

export default Navbar