
import { useParams,useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../services/api"
import ArticleCard from "../components/ArticleCard"

function CreatorProfile() {

  const { id } = useParams()

  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  
useEffect(() => {

  if (!token) {
    navigate("/login")
    return
  }

  loadProfile()

}, [])
  const loadProfile = async () => {

    try {
console.log("Loading profile for userId:", id)
      const res = await api.get(`/profile/${id}`)
      const data = res.data

      setProfile(data)
      setPosts(data.posts || [])

    } catch (error) {
      console.error("Failed to load profile", error)
    }

  }

  if (!profile) {
    return <p className="p-10">Loading profile...</p>
  }

  return (

    <div className="max-w-screen-xl mx-auto p-10">

      <div className="flex items-center gap-6 mb-10">

        <img
          src={`https://i.pravatar.cc/100?u=${profile.id}`}
          className="w-20 h-20 rounded-full"
        />

        <div>

          <h1 className="text-3xl font-bold">
            {profile.name}
          </h1>

          <p className="text-gray-500">
            {profile.email}
          </p>

          <div className="flex gap-6 mt-2 text-sm text-gray-600">

            <span>{profile.followers} followers</span>

            <span>{profile.following} following</span>

            <span>{profile.totalLikes} likes</span>

          </div>

        </div>

      </div>

      <h2 className="text-2xl font-bold mb-6">
        Articles by {profile.name}
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {posts.length === 0 ? (
          <p>No articles yet</p>
        ) : (

          posts.map(post => (
            <ArticleCard
              key={post.id}
              article={post}
            />
          ))

        )}

      </div>

    </div>
  )
}

export default CreatorProfile

