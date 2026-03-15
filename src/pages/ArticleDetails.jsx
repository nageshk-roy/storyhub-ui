import { Heart, Bookmark } from "lucide-react"
import CommentSection from "../components/CommentSection"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../services/api"
import { getImageUrl } from "../utils/imageUrl"

function ArticleDetails() {

  const { id } = useParams()

  const [article, setArticle] = useState(null)
  const [likes, setLikes] = useState(0)

  // Load article
  useEffect(() => {

    api.get(`/posts/${id}`)
      .then((res) => {

        const post = res.data.data

        setArticle(post)

        // initialize likes
        setLikes(post.likes || 0)

      })
      .catch((err) => {
        console.error("Error loading article", err)
      })

  }, [id])

  // Like handler
  const handleLike = async () => {

    try {

      const res = await api.post(`/posts/${article.id}/like`)

      setLikes(res.data.likes)

    } catch (error) {

      console.error("Like failed", error)

    }

  }

  if (!article) {
    return <p className="p-10">Loading article...</p>
  }

  return (
    <div className="max-w-3xl mx-auto p-10">

      {/* Title */}

      <h1 className="text-4xl font-bold mb-4">
        {article.title}
      </h1>

      {/* Author Section */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <p className="font-semibold">
            Author
          </p>

          <p className="text-gray-500 text-sm">
            {article.views} views
          </p>
        </div>

        <button className="border px-4 py-2 rounded">
          Follow
        </button>

      </div>

      {/* Cover Image */}

     <img
  src={
    getImageUrl(article.coverImage) ||
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  }
  className="w-full h-96 object-cover rounded-xl"
/>
      {/* Content */}

      <div
        className="text-lg leading-8 text-gray-700"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Actions */}

      <div className="flex gap-6 mt-8 border-t pt-6">

        {/* LIKE BUTTON */}

        <button
          onClick={handleLike}
          className="flex items-center gap-2"
        >
          <Heart size={20} />
          {likes}
        </button>

        {/* BOOKMARK BUTTON */}

        <button className="flex items-center gap-2">
          <Bookmark size={20} />
          Bookmark
        </button>

      </div>

      {/* Comments */}

      <CommentSection postId={article.id} />

    </div>
  )
}

export default ArticleDetails