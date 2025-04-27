import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import { fetchProfile, fetchUserPosts, fetchUserCommunities } from "../api";
import socket from "../socket";
import CreatePostModal from "../components/CreatePost";
import Post from "../components/PostCard";
import EditProfileModal from "../components/EditProfileModal";
import CreateCommunityModal from "../components/CreateCommunityModal";

const Profile = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [activeTab, setActiveTab] = useState("posts"); // "posts" or "communities"
  const [communities, setCommunities] = useState([]);

  const userId = id || user?._id || user?.id;

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId) return;
      try {
        const [profileData, postData] = await Promise.all([
          fetchProfile(userId),
          fetchUserPosts(userId),
        ]);
        setProfile(profileData);
        setPosts(postData);
      } catch (err) {
        toast.error("Failed to load profile");
        console.error("Error loading profile:", err);
      }
    };

    loadProfile();
  }, [userId]);

  useEffect(() => {
    const handlePostDeleted = ({ postId }) => {
      setPosts((prev) =>
        prev
          .filter((post) => post && post._id) // prevent undefined entries
          .filter((post) => String(post._id) !== String(postId))
      );

      toast.success("Post deleted successfully");
    };

    const handleDeleteError = ({ error }) => {
      toast.error(error || "Failed to delete post");
      console.error("Delete error:", error);
    };

    socket.on("postDeleted", handlePostDeleted);
    socket.on("deleteError", handleDeleteError);

    return () => {
      socket.off("postDeleted", handlePostDeleted);
      socket.off("deleteError", handleDeleteError);
    };
  }, []);

  useEffect(() => {
    const handleNewPost = (newPost) => {
      if (newPost?.user?._id === userId || newPost?.user === userId) {
        setPosts((prev) => [newPost, ...prev]);
        toast.success("New post created!");
      }
    };

    socket.on("newPost", handleNewPost);
    return () => socket.off("newPost", handleNewPost);
  }, [userId]);

  useEffect(() => {
    const loadCommunities = async () => {
      try {
        const res = await fetchUserCommunities();
        setCommunities(res);
      } catch (err) {
        toast.error("Failed to load communities");
      }
    };

    if (userId) {
      loadCommunities();
    }
  }, [userId]);

  const handleCommunityCreated = (newCommunity) => {
    toast.success("Community created!");
    setCommunities((prev) => [newCommunity, ...prev]); // <- add to list
    socket.emit("newCommunity", newCommunity);
  };

  if (!profile) {
    return <p className="text-white text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-900 text-white overflow-hidden pb-24">
      <div className="bg-gray-800 p-6 w-full md:max-w-sm border-r border-gray-700 overflow-y-auto">
        <div className="text-center">
          <img
            src={
              profile.avatar || "https://www.w3schools.com/howto/img_avatar.png"
            }
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500 mx-auto"
          />
          <h2 className="text-2xl font-bold mt-4">{profile.username}</h2>
          <p className="text-gray-400">{profile.bio || "No bio available."}</p>
          <p className="mt-4 text-blue-400">
            🎮 {profile.favoriteGames || "Not specified"}
          </p>
          <button
            onClick={() => setShowPostModal(true)}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded-md"
          >
            ➕ Create Post
          </button>
          <button
            onClick={() => setShowEditModal(true)}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md"
          >
            ✏️ Edit Profile
          </button>
          <button
            onClick={() => setShowCommunityModal(true)}
            className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md"
          >
            🛡️ Create Community
          </button>
        </div>
      </div>

      <div className="flex-grow p-6 overflow-y-auto no-scrollbar">
        <div className="flex justify-center space-x-6 border-b border-gray-700 mb-4">
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "posts"
                ? "border-b-2 border-blue-500 text-white"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("posts")}
          >
            📝 Posts
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "communities"
                ? "border-b-2 border-blue-500 text-white"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("communities")}
          >
            🛡️ Communities
          </button>
        </div>

        {activeTab === "posts" ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Your Posts</h2>
            {posts.length === 0 ? (
              <p className="text-gray-400 text-center">No posts yet.</p>
            ) : (
              posts.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  hideUserInfo={true}
                  showDelete={true}
                  onDeleteSuccess={(deletedPostId) =>
                    setPosts((prev) =>
                      prev.filter((p) => p && p._id !== deletedPostId)
                    )
                  }
                />
              ))
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Your Communities</h2>
            {communities.length === 0 ? (
              <p className="text-gray-400 text-center">No communities yet.</p>
            ) : (
              communities.map((community) => (
                <div
                  key={community._id}
                  className="bg-gray-800 p-4 rounded-lg mb-3"
                >
                  <h3 className="text-xl font-semibold">{community.name}</h3>
                  <p className="text-gray-400">{community.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    👥 Members: {community.memberCount} | 📝 Posts:{" "}
                    {community.postCount}
                  </p>
                </div>
              ))
            )}
          </>
        )}
      </div>

      <CreatePostModal
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
        onPostCreated={(newPost) => {
          setPosts((prev) => [newPost, ...prev]); // Update local state
          socket.emit("newPost", newPost); // Notify others (optional)
        }}
      />
      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        profileData={profile}
        onUpdateSuccess={(updatedProfile) => setProfile(updatedProfile)}
      />
      <CreateCommunityModal
        isOpen={showCommunityModal}
        onClose={() => setShowCommunityModal(false)}
        onCommunityCreated={handleCommunityCreated}
      />
    </div>
  );
};

export default Profile;
