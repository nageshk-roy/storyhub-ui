import { useEffect, useState } from "react"
import api from "../services/api"
import ArticleCard from "../components/ArticleCard"

function Bookmarks() {

  const [bookmarks, setBookmarks] = useState([])

  useEffect(() => {
    loadBookmarks()
  }, [])

  const loadBookmarks = async () => {
    try {

      const res = await api.get("/bookmarks")
      setBookmarks(res.data?.data || [])

    } catch (err) {
      console.error("Failed to load bookmarks", err)
    }
  }

  return (

    <div className="max-w-screen-xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-8">
        Saved Articles
      </h1>

      {bookmarks.length === 0 && (
        <p className="text-gray-500">
          You haven't bookmarked any articles yet.
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-8">

        {bookmarks.map(article => (
          <ArticleCard key={article.id} article={article}/>
        ))}

      </div>

    </div>
  )
}

export default Bookmarks
