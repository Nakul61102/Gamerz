import React from "react";

const ProfileTabs = ({ activeTab, setActiveTab }) => (
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
);

export default ProfileTabs;
