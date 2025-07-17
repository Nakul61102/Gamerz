import React from "react";
import CommunityCard from "../Cards/CommunityCard";

const CommunitiesList = ({
  communities = [],
  userId,
  onToggleMembership,
  onDelete,
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Your Communities</h2>
      {communities.length === 0 ? (
        <p className="text-gray-400 text-center">No communities yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communities.map((community) => (
            <CommunityCard
              key={community._id}
              community={community}
              userId={userId}
              onToggleMembership={onToggleMembership}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CommunitiesList;
