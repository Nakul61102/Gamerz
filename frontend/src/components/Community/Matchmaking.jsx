import { useEffect, useState } from "react";
import { getCommunityMatchPosts } from "../../api";
import { useParams } from "react-router-dom";

const MatchmakingList = () => {
  const { id: communityId } = useParams(); // Get community ID from URL
  const [matchRequests, setMatchRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMatchRequests = async () => {
      try {
        const res = await getCommunityMatchPosts(communityId);
        setMatchRequests(res);
      } catch (error) {
        console.error("Failed to load matchmaking requests:", error);
      } finally {
        setLoading(false);
      }
    };

    if (communityId) {
      loadMatchRequests();
    }
  }, [communityId]);

  if (loading) return <p className="text-white">Loading matchmaking...</p>;

  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-bold mb-4">🤝 Matchmaking Requests</h2>

      {matchRequests.length === 0 ? (
        <p className="text-gray-400">No matchmaking requests found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {matchRequests.map((request) => (
            <div
              key={request._id}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-5 shadow-lg border border-gray-700 transition-transform hover:scale-[1.015] hover:shadow-xl duration-300"
            >
              <h3 className="text-xl font-bold text-green-400 mb-3">
                {request.user?.username || "Anonymous"} wants to play!
              </h3>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-300">
                <p>🎮 <strong>Game:</strong> {request.game}</p>
                <p>👥 <strong>Role:</strong> {request.preferredRole}</p>
                <p>🏆 <strong>Rank:</strong> {request.rankOrLevel}</p>
                <p>🔍 <strong>Looking For:</strong> {request.lookingFor}</p>
                <p className="col-span-2 text-gray-400">
                  🕒 <strong>Time:</strong> {request.gameTime}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchmakingList;
