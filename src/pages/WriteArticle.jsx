import { useState } from "react"
import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css"
import api from "../services/api"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function WriteArticle() {

  const navigate = useNavigate()
  const { quill, quillRef } = useQuill()

  const [title, setTitle] = useState("")
  const [tags, setTags] = useState("")
  const [image, setImage] = useState(null)

  const handlePublish = async () => {

    const content = quill?.root.innerHTML

    if (!title.trim()) {
      toast.error("Title is required")
      return
    }

    if (title.length < 5) {
      toast.error("Title must be at least 5 characters")
      return
    }

    if (!content || content === "<p><br></p>") {
      toast.error("Article content cannot be empty")
      return
    }

    try {

      const formData = new FormData()

      formData.append("title", title)
      formData.append("content", content)
      formData.append("status", "PUBLISHED")

      if (image) {
        formData.append("image", image)
      }

      await api.post("/posts/create", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      toast.success("Article published successfully!")

      navigate("/dashboard")

    } catch (error) {

      console.error(error)
      toast.error("Failed to publish article")

    }

  }

  return (

    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}

      <div className="bg-white border-b sticky top-0 z-40">

        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">

          <h2 className="text-lg font-semibold">
            Write a Story
          </h2>

          <button
            onClick={handlePublish}
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Publish
          </button>

        </div>

      </div>


      {/* EDITOR AREA */}

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* COVER IMAGE */}

        <div className="mb-6">

          <label className="block text-sm font-medium mb-2">
            Cover Image
          </label>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border p-3 rounded"
          />

        </div>


        {/* TITLE */}

        <input
          type="text"
          placeholder="Write your article title..."
          className="w-full text-4xl font-bold outline-none mb-6 bg-transparent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />


        {/* EDITOR */}

        <div className="bg-white border rounded-lg mb-6">

          <div ref={quillRef} className="h-96" />

        </div>


        {/* TAGS */}

        <div className="mb-6">

          <label className="block text-sm font-medium mb-2">
            Tags
          </label>

          <input
            type="text"
            placeholder="example: technology, programming"
            className="w-full border rounded p-3"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

        </div>


        {/* FOOTER ACTION */}

        <div className="flex justify-end">

          <button
            onClick={handlePublish}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Publish Article
          </button>

        </div>

      </div>

    </div>

  )
}

export default WriteArticle