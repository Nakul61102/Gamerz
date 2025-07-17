const CommunityHeader = ({ community }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-md flex flex-col md:flex-row items-center justify-between">
      {/* Avatar */}
      <div className="flex items-center mb-4 md:mb-0">
        <img
          src={community.avatar || "https://via.placeholder.com/100"}
          alt="Community Avatar"
          className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{community.name}</h1>
          <p className="text-gray-400 mt-1">{community.description || "No description provided."}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="text-sm text-gray-300 space-y-1 text-center md:text-right">
        <p>
          👥 Members: <span className="font-semibold">{community.memberCount || 0}</span>
        </p>
        <p>
          👑 Admin:{" "}
          <span className="font-semibold text-white">
            {typeof community.admin === "object" ? community.admin.username : community.adminName}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CommunityHeader;
