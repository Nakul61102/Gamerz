const ProfileCard = ({ profile }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg text-center shadow-md">
      <img 
        src={profile.avatar || "https://via.placeholder.com/100"} 
        alt="Avatar" 
        className="w-20 h-20 rounded-full mx-auto mb-3"
      />
      <h3 className="text-lg font-bold">{profile.username}</h3>
      <p className="text-gray-300">{profile.bio}</p>
      <p className="text-gray-400 mt-2">🎮 Favorite Game: {profile.favoriteGame}</p>
    </div>
  );
};

export default ProfileCard;
