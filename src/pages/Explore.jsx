
import { useEffect, useState } from "react"
import api from "../services/api"
import ArticleCard from "../components/ArticleCard"

function Explore() {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      const res = await api.get("/posts")
      setArticles(res.data?.data?.content || [])
    } catch (err) {
      console.error("Error fetching posts", err)
    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="max-w-screen-xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-8">
        Explore Articles
      </h1>

      {loading && <p>Loading articles...</p>}

      {!loading && articles.length === 0 && (
        <p className="text-gray-500">No articles available</p>
      )}

      <div className="grid md:grid-cols-3 gap-8">

        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
          />
        ))}

      </div>

    </div>

  )
}

export default Explore

