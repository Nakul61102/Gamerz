import React from "react";

const ProfileSidebar = ({
  profile,
  onCreatePost,
  onEditProfile,
  onCreateCommunity,
}) => {
  return (
    <div className="bg-gray-800 p-6 w-full md:max-w-sm border-r border-gray-700 overflow-y-auto">
      <div className="text-center">
        <img
          src={
            profile.avatar ||
            "https://www.w3schools.com/howto/img_avatar.png"
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
          onClick={onCreatePost}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded-md"
        >
          ➕ Create Post
        </button>
        <button
          onClick={onEditProfile}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md"
        >
          ✏️ Edit Profile
        </button>
        <button
          onClick={onCreateCommunity}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md"
        >
          🛡️ Create Community
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
