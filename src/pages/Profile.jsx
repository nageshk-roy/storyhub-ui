
import { useEffect, useState } from "react"
import api from "../services/api"
import ArticleCard from "../components/ArticleCard"

function Profile() {

  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    loadProfile()
  }, [])
const loadProfile = async () => {
  try {

    const res = await api.get(`/profile/${id}`)

    setProfile(res.data)

  } catch (error) {
    console.error("Failed to load profile", error)
  }
}

  if (!profile) return <p className="p-10">Loading profile...</p>

  return (

    <div className="max-w-screen-xl mx-auto p-10">

      {/* Profile Header */}

      <div className="flex items-center gap-6 mb-10">

        <img
          src="https://i.pravatar.cc/120"
          className="w-24 h-24 rounded-full"
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

            <span>{posts.length} articles</span>

          </div>

        </div>

      </div>

      {/* Articles */}

      <h2 className="text-2xl font-bold mb-6">
        Your Articles
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {posts.length === 0 ? (
          <p>No articles yet</p>
        ) : (
          posts.map(post => (
            <ArticleCard key={post.id} article={post}/>
          ))
        )}

      </div>

    </div>

  )
}

export default Profile

