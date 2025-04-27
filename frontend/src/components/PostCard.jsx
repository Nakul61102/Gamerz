import { useState, useEffect } from "react";
import { likePost, deletePost } from "../api";
import { FaHeart, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Post = ({ post, hideUserInfo = false, showDelete = false, onDeleteSuccess }) => {
  const [likes, setLikes] = useState(post.likes || []);
  const [liked, setLiked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const userId = localStorage.getItem("userId");

  // Check if user liked the post
  useEffect(() => {
    setLiked(likes.map(String).includes(userId));
  }, [likes, userId]);

  const handleLike = async () => {
    try {
      const response = await likePost(post._id, userId);
      setLikes(response.post.likes);
    } catch (error) {
      toast.error("Failed to like post");
      console.error("Error liking post:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
  
    setIsDeleting(true);
    try {
      await deletePost(post._id);
  
      // Immediately update local UI
      if (onDeleteSuccess) {
        onDeleteSuccess(post._id);
      }
  
      // Optional: emit socket event for others
      // socket.emit("postDeleted", { postId: post._id }); // ← If you're handling this elsewhere, it's fine
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete post");
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  
  

  return (
    <div className="bg-gray-800 text-white rounded-xl shadow-md overflow-hidden m-4 relative">
      {/* Delete button (only shown when showDelete=true) */}
      {showDelete && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`absolute top-3 right-3 p-2 rounded-full transition
            ${isDeleting ? "bg-gray-600" : "text-gray-400 hover:text-red-500 hover:bg-gray-700"}`}
          aria-label="Delete post"
        >
          {isDeleting ? "Deleting..." : <FaTrash />}
        </button>
      )}

      {/* Header */}
      {!hideUserInfo && (
        <div className="flex items-center gap-3 p-4">
          <img
            src={post.user?.avatar || "https://www.w3schools.com/howto/img_avatar.png"}
            alt="User avatar"
            className="w-10 h-10 rounded-full border object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://www.w3schools.com/howto/img_avatar.png";
            }}
          />
          <span className="font-semibold text-white">
            {post.user?.username || "Anonymous"}
          </span>
        </div>
      )}

      {/* Content */}
      <div className={hideUserInfo ? "p-4" : "px-4 pb-4"}>
        <p className="mb-2 text-gray-300">{post.content}</p>
        {post.image && (
          <img
            src={post.image}
            alt="Post visual"
            className="w-full h-auto max-h-96 object-cover rounded-lg"
          />
        )}

        {/* Like Button */}
        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition ${
              liked ? "bg-red-600" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <FaHeart className={`${liked ? "text-white" : "text-red-400"}`} />
            <span>{likes.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;