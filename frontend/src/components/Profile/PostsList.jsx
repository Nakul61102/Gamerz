import React from "react";
import Post from "../Cards/PostCard";

const PostsList = ({ posts, onDeleteSuccess }) => (
  <>
    <h2 className="text-2xl font-bold mb-4">Your Posts</h2>
    {posts.length === 0 ? (
      <p className="text-gray-400 text-center">No posts yet.</p>
    ) : (
      posts
        .filter((post) => post && post._id)
        .map((post) => (
          <Post
            key={post._id}
            post={post}
            hideUserInfo={true}
            showDelete={true}
            onDeleteSuccess={onDeleteSuccess}
          />
        ))
    )}
  </>
);

export default PostsList;
