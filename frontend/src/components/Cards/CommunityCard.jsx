import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const CommunityCard = ({ community, userId, onToggleMembership, onDelete }) => {
  const adminId =
    typeof community.admin === "object" ? community.admin._id : community.admin;

  const isAdmin = adminId === userId;

  return (
    <Link to={`/community/${community._id}`} className="block">
      <div className="bg-gray-800 rounded-xl p-5 text-white shadow-md hover:shadow-lg transition duration-300 relative">
        {/* 🗑️ Delete Button (visible only to admin) */}
        {isAdmin && onDelete && (
          <button
            onClick={(e) => {
              e.preventDefault(); // prevent navigation
              e.stopPropagation(); // prevent bubbling
              onDelete(community._id);
            }}
            className="absolute top-3 right-3 text-red-400 hover:text-red-600"
            title="Delete Community"
          >
            <FaTrash />
          </button>
        )}

        <h3 className="text-xl font-semibold mb-1">{community.name}</h3>
        <p className="text-gray-300 mb-3">{community.description}</p>

        {/* 🟦 Join / Leave Button (not visible for admin) */}
        {!isAdmin && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleMembership(community._id, community.isMember);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              community.isMember
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {community.isMember ? "Leave" : "Join"}
          </button>
        )}

        {/* 👥 Members and Posts Info */}
        <div className="flex items-center justify-between text-sm text-gray-400 mt-3">
          <div>
            👥 <span className="font-medium">{community.memberCount}</span> Members
          </div>
          <div>
            📝 <span className="font-medium">{community.postCount}</span> Posts
          </div>
        </div>

        {/* 👑 Admin Info */}
        <div className="text-sm text-gray-400 mt-1">
          👑 Admin:{" "}
          <span className="text-white font-semibold">{community.adminName}</span>
        </div>
      </div>
    </Link>
  );
};

export default CommunityCard;
