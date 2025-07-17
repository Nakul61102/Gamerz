import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import {
  fetchProfile,
  fetchUserPosts,
  fetchUserCommunities,
  deleteCommunity,
} from "../api";
import socket from "../socket";
import CreatePostModal from "../components/Forms/CreatePost";
import EditProfileModal from "../components/Forms/EditProfileModal";
import CreateCommunityModal from "../components/Forms/CreateCommunityModal";

import ProfileSidebar from "../components/Profile/ProfileSidebar";
import ProfileTabs from "../components/Profile/ProfileTabs";
import PostsList from "../components/Profile/PostsList";
import CommunitiesList from "../components/Profile/CommunitiesList";

const Profile = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

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
      }
    };
    loadProfile();
  }, [userId]);

  useEffect(() => {
    const handlePostDeleted = ({ postId }) => {
      setPosts((prev) => prev.filter((post) => post && post._id !== postId));
      toast.success("Post deleted successfully");
    };

    socket.on("postDeleted", handlePostDeleted);
    return () => socket.off("postDeleted", handlePostDeleted);
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

    if (userId) loadCommunities();
  }, [userId]);

  const handleCommunityCreated = (newCommunity) => {
    toast.success("Community created!");
    setCommunities((prev) => [newCommunity, ...prev]);
    socket.emit("newCommunity", newCommunity);
  };

  const handleDeleteCommunity = async (communityId) => {
    if (!window.confirm("Are you sure you want to delete this community?"))
      return;

    try {
      await deleteCommunity(communityId);
      toast.success("Community deleted");

      // OPTIONAL: If you're managing communities state in this component
      setCommunities((prev) => prev.filter((c) => c._id !== communityId));
    } catch (error) {
      toast.error(error.message || "Failed to delete community");
    }
  };

  if (!profile) {
    return <p className="text-white text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-900 text-white overflow-hidden pb-24">
      <ProfileSidebar
        profile={profile}
        onCreatePost={() => setShowPostModal(true)}
        onEditProfile={() => setShowEditModal(true)}
        onCreateCommunity={() => setShowCommunityModal(true)}
      />
      <div className="flex-grow p-6 overflow-y-auto no-scrollbar">
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "posts" ? (
          <PostsList
            posts={posts}
            onDeleteSuccess={(deletedId) =>
              setPosts((prev) => prev.filter((p) => p && p._id !== deletedId))
            }
          />
        ) : (
          <CommunitiesList
            communities={communities}
            onDelete={handleDeleteCommunity}
          />
        )}
      </div>

      {/* Modals */}
      <CreatePostModal
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
        onPostCreated={(newPost) => {
          setPosts((prev) => [newPost, ...prev]);
          socket.emit("newPost", newPost);
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
