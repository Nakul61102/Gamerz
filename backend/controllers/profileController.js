import Gamer from "../models/gamerSchema.js";



export const getProfile = async (req, res) => {
  const { id } = req.params; // ID of the gamer to fetch

  try {
    const gamer = await Gamer.findById(id);
    if (!gamer) {
      return res.status(404).json({ message: "Gamer not found." });
    }

    res.status(200).json(gamer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile.", error });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, bio, avatar, favoriteGames } = req.body;

  try {
    const gamer = await Gamer.findById(id);
    if (!gamer) {
      return res.status(404).json({ message: "Gamer not found." });
    }

    // Check if the username already exists for another user
    const existingUsername = await Gamer.findOne({ username, _id: { $ne: id } });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already registered by another user." });
    }

    // Update profile fields
    gamer.username = username || gamer.username;
    gamer.bio = bio || gamer.bio;
    gamer.avatar = avatar || gamer.avatar;
    gamer.favoriteGames = favoriteGames || gamer.favoriteGames;

    const updatedProfile = await gamer.save();

    return res.status(200).json({
      message: "Profile updated successfully!",
      profile: updatedProfile, // send updated profile
    });

  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Error updating profile.", error });
  }
};


export const deleteProfile = async (req, res) => {
  const { id } = req.params; // ID of the gamer to delete

  try {
    const gamer = await Gamer.findByIdAndDelete(id);
    if (!gamer) {
      return res.status(404).json({ message: "Gamer not found." });
    }

    res.status(200).json({ message: "Profile deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile.", error });
  }
};
