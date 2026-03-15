import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ArticleCard from "../components/ArticleCard"
import api from "../services/api"
import SkeletonCard from "../components/SkeletonCard"

function Home() {

  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const [posts, setPosts] = useState([])
  const [followingPosts, setFollowingPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    loadData()

  }, [])

  const loadData = async () => {

    try {

      const trending = await api.get("/posts/trending")
      

      setPosts(trending.data?.data || [])
    if (token) {
  const following = await api.get("/posts/following")
  setFollowingPosts(following.data?.data || [])
}

    } catch (error) {

      console.error("Failed loading homepage", error)

    } finally {

      setLoading(false)

    }

  }

  // ⭐ FIXED LOGIC
  const handleStartWriting = () => {

    if (!token) {
      navigate("/login")
    } else {
      navigate("/write")
    }

  }

  return (

    <div>

      {loading && (

        <div className="grid md:grid-cols-2 gap-8">
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
        </div>

      )}

      {/* HERO SECTION */}

      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-24">

        <div className="max-w-screen-xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold mb-6">
            Share Your Ideas With The World
          </h1>

          <p className="text-gray-300 text-lg mb-8">
            Discover stories, thinking and expertise from writers on StoryHub.
          </p>

          <button
            onClick={handleStartWriting}
            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Start Writing
          </button>

        </div>

      </section>



      {/* MAIN FEED */}

      <section className="max-w-screen-xl mx-auto px-6 py-16">

        <div className="grid grid-cols-12 gap-10">


          {/* LEFT FEED */}

          <div className="col-span-12 lg:col-span-8">

            <h2 className="text-2xl font-bold mb-6">
              From Creators You Follow
            </h2>

            {followingPosts.length === 0 && (
              <p className="text-gray-500 mb-10">
                Follow creators to see their stories here.
              </p>
            )}

            <div className="grid md:grid-cols-2 gap-8 mb-12">

              {followingPosts.map(post => (

                <ArticleCard
                  key={post.id}
                  article={post}
                />

              ))}

            </div>



            {/* TRENDING */}

            <h2 className="text-2xl font-bold mb-6">
              Trending Articles
            </h2>

            <div className="grid md:grid-cols-2 gap-8">

              {posts.map(post => (

                <ArticleCard
                  key={post.id}
                  article={post}
                />

              ))}

            </div>

          </div>



          {/* RIGHT SIDEBAR */}

          <div className="col-span-12 lg:col-span-4 space-y-10">


            {/* STORIES */}

            <div>

              <h3 className="text-xl font-semibold mb-4">
                Stories
              </h3>

              <div className="flex gap-4 overflow-x-auto">

                {[1,2,3,4].map(i => (

                  <div
                    key={i}
                    className="w-28 h-40 rounded-xl bg-gradient-to-b from-gray-300 to-gray-200 flex items-center justify-center font-semibold hover:scale-105 transition"
                  >
                    Story
                  </div>

                ))}

              </div>

            </div>



            {/* TOPICS */}

            <div className="bg-gray-100 p-6 rounded-xl">

              <h3 className="font-semibold mb-4">
                Explore Topics
              </h3>

              <div className="flex flex-wrap gap-3">

                {[
                  "Technology",
                  "Programming",
                  "AI",
                  "Career",
                  "Finance",
                  "Startups"
                ].map(topic => (

                  <span
                    key={topic}
                    className="bg-white px-4 py-2 rounded-full text-sm hover:bg-black hover:text-white cursor-pointer transition"
                  >
                    {topic}
                  </span>

                ))}

              </div>

            </div>



            {/* TOP CREATORS */}

            <div>

              <h3 className="text-xl font-semibold mb-6">
                Top Creators
              </h3>

              <div className="space-y-4">

                {[
                  "Nagesh",
                  "Rahul",
                  "Priya",
                  "Kiran"
                ].map((name,i) => (

                  <div
                    key={i}
                    className="flex items-center justify-between bg-white p-4 rounded-xl shadow hover:shadow-md"
                  >

                    <div className="flex items-center gap-3">

                      <img
                        src={`https://i.pravatar.cc/40?img=${i+1}`}
                        className="w-10 h-10 rounded-full"
                      />

                      <span className="font-semibold">
                        {name}
                      </span>

                    </div>

                    <button className="text-sm border px-3 py-1 rounded-full">
                      Follow
                    </button>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* FOOTER */}

      <footer className="bg-gray-900 text-gray-400 text-center py-8">

        <p>
          © 2026 StoryHub — Built with ❤️ by Nagesh
        </p>

      </footer>

    </div>

  )
}

export default Home