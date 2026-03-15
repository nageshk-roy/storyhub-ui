import { Heart, Bookmark } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import api from "../services/api"
import { useState } from "react"
import { getImageUrl } from "../utils/imageUrl"

function ArticleCard({ article }) {

  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const [likes, setLikes] = useState(article?.likes || 0)
  const [following, setFollowing] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!article) return null


  const requireLogin = () => {
    if (!token) {
      navigate("/login")
      return true
    }
    return false
  }


  const handleLike = async () => {

    if (requireLogin()) return

    try {

      if (loading) return
      setLoading(true)

      const res = await api.post(`/posts/${article.id}/like`)
      setLikes(res.data.likes)

    } catch (error) {

      console.error("Like failed", error)

    } finally {

      setLoading(false)

    }

  }


  const handleFollow = async () => {

    if (requireLogin()) return

    try {

      const res = await api.post(`/follow/${article.id}`)
      setFollowing(res.data.following)

    } catch (error) {

      console.error("Follow failed", error)

    }

  }


  const handleBookmark = async () => {

    if (requireLogin()) return

    try {

      await api.post(`/bookmarks/${article.id}`)
      setBookmarked(true)

    } catch (error) {

      console.error("Bookmark failed", error)

    }

  }


  const openArticle = () => {

    if (requireLogin()) return
    navigate(`/article/${article.id}`)

  }


  const openCreator = () => {

    if (requireLogin()) return
    navigate(`/creator/${article.id}`)

  }


  return (

    <div className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">

      {/* COVER IMAGE */}

      <img
        src={
          getImageUrl(article.coverImage) ||
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
        }
        className="w-full h-48 object-cover hover:scale-105 transition duration-300 cursor-pointer"
        onClick={openArticle}
      />


      <div className="p-5">

        {/* AUTHOR */}

        <div className="flex items-center justify-between mb-3">

          <div
            onClick={openCreator}
            className="flex items-center gap-2 cursor-pointer"
          >

            <img
              src={`https://i.pravatar.cc/40?u=${article.id}`}
              className="w-8 h-8 rounded-full"
            />

            <span className="text-sm text-gray-600 hover:underline">
              {article.authorName || "Creator"}
            </span>

          </div>

          <button
            onClick={handleFollow}
            className={`text-xs px-3 py-1 rounded-full border 
            ${following ? "bg-gray-900 text-white" : "bg-white"}`}
          >
            {following ? "Following" : "Follow"}
          </button>

        </div>


        {/* TITLE */}

        <h2
          onClick={openArticle}
          className="text-lg font-semibold mb-2 hover:underline line-clamp-2 cursor-pointer"
        >
          {article.title}
        </h2>


        {/* PREVIEW */}

        <p
          className="text-gray-500 text-sm line-clamp-3"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />


        {/* ACTIONS */}

        <div className="flex justify-between items-center mt-4">

          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-gray-500 hover:text-red-500"
          >

            <Heart size={18} />

            <span className="text-sm">{likes}</span>

          </button>


          <button
            onClick={handleBookmark}
            className={`text-gray-500 hover:text-black ${
              bookmarked ? "text-black" : ""
            }`}
          >
            <Bookmark size={18} />
          </button>

        </div>

      </div>

    </div>

  )
}

export default ArticleCard