import { useState } from "react";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

const CommunityFeed = ({ community }) => {
  const [posts, setPosts] = useState([
    { id: 1, username: "PlayerOne", content: "Excited for the next tournament!", likes: 5, comments: 1 },
  ]);

  const handleNewPost = (content) => {
    const newPost = { id: posts.length + 1, username: "You", content, likes: 0, comments: 0 };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">{community.name} Posts</h2>
      {community.joined ? <CreatePost onPost={handleNewPost} /> : <p className="text-gray-400">Join this community to post.</p>}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default CommunityFeed;
