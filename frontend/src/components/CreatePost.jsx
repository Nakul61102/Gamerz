import { useState } from "react";
import { createPost } from "../api";

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Post content is required.");
      return;
    }

    try {
      const response = await createPost({ content, image });
      onPostCreated(response.post);
      setContent("");
      setImage("");
      setError("");
      onClose();
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md text-white">
        <h2 className="text-xl font-bold mb-4">Create Post</h2>

        {error && <p className="text-red-400 mb-2 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-3 rounded bg-gray-700 resize-none"
            rows="4"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            className="w-full p-2 rounded bg-gray-700"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 rounded">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
