import { useEffect, useState } from "react"
import api from "../services/api"

function CommentSection({ postId }) {

  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    loadComments()
  }, [postId])

  const loadComments = () => {

    api.get(`/comments/post/${postId}`)
      .then((res) => {

        console.log("Comments response:", res.data)

        setComments(res.data || [])

      })
      .catch((err) => {
        console.error("Failed to load comments", err)
      })

  }

  const handleComment = async () => {

    if (!commentText.trim()) return

    try {

      await api.post("/comments", {
        postId: postId,
        content: commentText
      })

      setCommentText("")

      loadComments()

    } catch (err) {

      console.error("Failed to add comment", err)

    }

  }

  const handleDelete = async (commentId) => {

    try {

      await api.delete(`/comments/${commentId}`)

      loadComments()

    } catch (err) {

      console.error("Failed to delete comment", err)

    }

  }

  return (

    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-4">
        Comments
      </h2>

      {/* Add Comment */}

      <textarea
        placeholder="Write a comment..."
        className="w-full border rounded p-3 mb-4"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />

      <button
        onClick={handleComment}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Post Comment
      </button>

      {/* Comments List */}

      <div className="mt-6 space-y-4">

        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet</p>
        ) : (

          comments.map((comment) => (

            <div
              key={comment.id}
              className="border p-4 rounded flex justify-between items-start"
            >

              <div>

                <p className="font-semibold">
                  {comment.authorName}
                </p>

                <p className="text-gray-600 text-sm">
                  {comment.content}
                </p>

              </div>

              <button
                onClick={() => handleDelete(comment.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>

            </div>

          ))

        )}

      </div>

    </div>

  )
}

export default CommentSection