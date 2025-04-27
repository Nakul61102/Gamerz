const CommunityCard = ({ community, userId, onToggleMembership }) => {
  const adminId =
    typeof community.admin === "object" ? community.admin._id : community.admin;

  const isAdmin = adminId === userId;

  
  return (
    <div className="bg-gray-800 rounded-xl p-5 text-white shadow-md hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-semibold mb-1">{community.name}</h3>
      <p className="text-gray-300 mb-3">{community.description}</p>

      {!isAdmin && (
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            community.isMember
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={() => onToggleMembership(community._id, community.isMember)}
        >
          {community.isMember ? "Leave" : "Join"}
        </button>
      )}

      <div className="flex items-center justify-between text-sm text-gray-400 mt-2">
        <div>
          👥 <span className="font-medium">{community.memberCount}</span>{" "}
          Members
        </div>
        <div>
          📝 <span className="font-medium">{community.postCount}</span> Posts
        </div>
      </div>
      <div className="text-sm text-gray-400">
        👑 Admin:{" "}
        <span className="text-white font-semibold">{community.adminName}</span>
      </div>
    </div>
  );
};

export default CommunityCard;
