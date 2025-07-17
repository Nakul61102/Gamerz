import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { likePost, deletePost } from "../../api";
import { FaHeart, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

// Avatar with fallback
const Avatar = ({ src, alt }) => (
  <img
    src={src || "https://www.w3schools.com/howto/img_avatar.png"}
    alt={alt}
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = "https://www.w3schools.com/howto/img_avatar.png";
    }}
    className="w-10 h-10 rounded-full border object-cover"
  />
);

const Post = ({ post, hideUserInfo = false, showDelete = false, onDeleteSuccess }) => {
  const [likes, setLikes] = useState(post?.likes || []);
  const [liked, setLiked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [liking, setLiking] = useState(false);

  const { user } = useContext(AuthContext);
  const userId = user?._id || user?.id || localStorage.getItem("userId");

  // Check if user liked the post
  useEffect(() => {
    setLiked(likes.map(String).includes(String(userId)));
  }, [likes, userId]);

  const handleLike = async () => {
    setLiking(true);
    try {
      const response = await likePost(post._id, userId);
      setLikes(response.post.likes);
    } catch (error) {
      toast.error("Failed to like post");
      console.error("Error liking post:", error);
    } finally {
      setLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    setIsDeleting(true);
    try {
      await deletePost(post._id);
      if (onDeleteSuccess) {
        onDeleteSuccess(post._id);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete post");
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!post || typeof post !== "object") return null;

  return (
    <div className="bg-gray-800 text-white rounded-xl shadow-md overflow-hidden m-4 relative">
      {/* Delete button */}
      {showDelete && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          aria-label="Delete post"
          className={`absolute top-3 right-3 p-2 rounded-full transition ${
            isDeleting ? "bg-gray-600" : "text-gray-400 hover:text-red-500 hover:bg-gray-700"
          }`}
        >
          {isDeleting ? "Deleting..." : <FaTrash />}
        </button>
      )}

      {/* User Info */}
      {!hideUserInfo && (
        <div className="flex items-center gap-3 p-4">
          <Avatar src={post.user?.avatar} alt={`${post.user?.username || "User"}'s avatar`} />
          <span className="font-semibold text-white">
            {post.user?.username || "Anonymous"}
          </span>
        </div>
      )}

      {/* Post Content */}
      <div className={hideUserInfo ? "p-4" : "px-4 pb-4"}>
        <p className="mb-2 text-gray-300">{post.content}</p>
        {post.image && (
          <img
            src={post.image}
            alt="Post visual"
            className="w-full h-auto max-h-96 sm:max-h-64 object-cover rounded-lg"
          />
        )}

        {/* Like Button */}
        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={handleLike}
            disabled={liking}
            aria-label={liked ? "Unlike post" : "Like post"}
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

// Props Validation
Post.propTypes = {
  post: PropTypes.object.isRequired,
  hideUserInfo: PropTypes.bool,
  showDelete: PropTypes.bool,
  onDeleteSuccess: PropTypes.func,
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
};

export default Post;
