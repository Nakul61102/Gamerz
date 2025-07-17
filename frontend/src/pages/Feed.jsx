import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import Post from "../components/Cards/PostCard";
import { fetchAllPosts } from "../api";
import socket from "../socket";


const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    getPosts();
  
    socket.on("newPost", (newPost) => {
      setPosts((prev) => [newPost, ...prev]);
    });
  
    socket.on("postDeleted", (deletedPostId) => {
      setPosts((prev) => prev.filter((post) => post._id !== deletedPostId));
    });
  
    return () => {
      socket.off("newPost");
      socket.off("postDeleted");
    };
  }, []);
  

  return (
    <div className="h-[calc(100vh-4rem)] w-full overflow-y-auto no-scrollbar px-4 pt-4 pb-24">
      {posts.length === 0 ? (
        <p className="text-center text-gray-400">
          No posts yet. Start the conversation!
        </p>
      ) : (
        <Masonry
          breakpointCols={{
            default: 3,
            1100: 2,
            700: 1,
          }}
          className="flex gap-6"
          columnClassName="space-y-6"
        >
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </Masonry>
      )}
    </div>
  );
};

export default Feed;
