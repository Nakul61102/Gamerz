import { useEffect, useState } from "react";
import { fetchCommunities, toggleCommunityMembership } from "../api";
import CommunityCard from "../components/Cards/CommunityCard";

const Community = () => {
  const [activeTab, setActiveTab] = useState("joined");
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [otherCommunities, setOtherCommunities] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;

  useEffect(() => {
    const getCommunities = async () => {
      try {
        const data = await fetchCommunities();

        const joined = data.filter((community) =>
          community.members.some((member) => member._id === userId)
        );

        const others = data.filter((community) =>
          !community.members.some((member) => member._id === userId)
        );

        setJoinedCommunities(joined);
        setOtherCommunities(others);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    getCommunities();
  }, [userId]);

  const handleToggleMembership = async (communityId, isMember) => {
    try {
      const response = await toggleCommunityMembership(communityId);

      // Update joined/other lists after toggling
      const updatedCommunities = [...joinedCommunities, ...otherCommunities].map((community) =>
        community._id === communityId
          ? { ...community, isMember: response.isMember }
          : community
      );

      const joined = updatedCommunities.filter((community) =>
        community.members.some((member) => member._id === userId)
      );

      const others = updatedCommunities.filter((community) =>
        !community.members.some((member) => member._id === userId)
      );

      setJoinedCommunities(joined);
      setOtherCommunities(others);
    } catch (error) {
      console.error("Failed to toggle community membership", error);
    }
  };

  const renderCommunities = (list, title, emptyMessage) => (
    <>
      <h3 className="text-xl text-white mb-2">{title}</h3>
      {list.length === 0 ? (
        <p className="text-gray-400 mb-4">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {list.map((community) => (
            <CommunityCard
              key={community._id}
              community={community}
              userId={userId}
              onToggleMembership={handleToggleMembership}
            />
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className="h-[calc(100vh-4rem)] w-full overflow-y-auto no-scrollbar px-4 pt-4 pb-24">
      <div className="flex justify-center space-x-6 mb-6 border-b border-gray-600 pb-2">
        <button
          onClick={() => setActiveTab("joined")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "joined"
              ? "border-b-2 border-blue-500 text-white"
              : "text-gray-400"
          }`}
        >
          👥 Joined
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "all"
              ? "border-b-2 border-blue-500 text-white"
              : "text-gray-400"
          }`}
        >
          🌐 All
        </button>
      </div>

      {activeTab === "joined"
        ? renderCommunities(joinedCommunities, "Joined Communities", "You haven't joined any communities.")
        : renderCommunities(otherCommunities, "Other Communities", "No other communities found.")
      }
    </div>
  );
};

export default Community;
