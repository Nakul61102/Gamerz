import Community from "../models/communitySchema.js";

//create with name and description
export const createCommunity = async (req, res) => {
  const { name, description } = req.body;

  try {
    const existingCommunity = await Community.findOne({ name });
    if (existingCommunity) {
      return res
        .status(400)
        .json({ message: "Community name already exists." });
    }

    const community = new Community({
      name,
      description,
      admin: req.gamer.id, // Gamer ID from authMiddleware
    });

    await community.save();
    res
      .status(201)
      .json({ message: "Community created successfully!", community });
  } catch (error) {
    res.status(500).json({ message: "Error creating community.", error });
  }
};

//join community
export const toggleCommunityMembership = async (req, res) => {
  const { communityId } = req.params;

  try {
    const community = await Community.findById(communityId); // Corrected model
    if (!community) {
      return res.status(404).json({ message: "Community not found." });
    }

    const gamerId = req.gamer.id; // From authentication middleware

    if (!gamerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const alreadyJoined = community.members.includes(gamerId);

    if (alreadyJoined) {
      // Remove member
      community.members = community.members.filter(
        (id) => id.toString() !== gamerId.toString()
      );
    } else {
      // Add member
      community.members.push(gamerId);
    }

    await community.save();

    res.status(200).json({
      message: alreadyJoined
        ? "Left the community successfully!"
        : "Joined the community successfully!",
      isMember: !alreadyJoined,
      community,
    });
  } catch (error) {
    console.error("Toggle membership error:", error);
    res.status(500).json({ message: "Error processing join/leave.", error });
  }
};

//get community by id
export const getCommunityById = async (req, res) => {
  const { id } = req.params;

  try {
    const community = await Community.findById(id)
      .populate("admin", "username _id")
      .populate("members", "username _id");

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    // Add derived counts manually
    const memberCount = community.members.length;
    const postCount = community.posts?.length || 0; // If you store posts in a subfield

    res.status(200).json({
      ...community.toObject(), // Convert Mongoose doc to plain object
      memberCount,
      postCount,
    });
  } catch (err) {
    console.error("Error fetching community:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


//get all
export const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find()
      .populate("admin", "_id username avatar") // Populate admin info
      .populate("members", "_id username avatar") // Populate member info
      .populate("posts", "_id") // Optional: post details if needed
      .lean();

    const userId = req.gamer?.id;

    const updatedCommunities = communities.map((community) => ({
      ...community,
      isMember: community.members.some(
        (member) => member._id.toString() === userId
      ),
      memberCount: community.members.length,
      postCount: community.posts.length,
      adminName: community.admin?.username || "Unknown",
    }));

    res.status(200).json(updatedCommunities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching communities.", error });
  }
};

//get user community
export const getUserCommunities = async (req, res) => {
  try {
    const userId = req.gamer.id; // authenticated user id

    const userCommunities = await Community.find({ admin: userId })
      .select("name description members posts createdAt")
      .lean();

    const communitiesWithCounts = userCommunities.map((community) => ({
      ...community,
      memberCount: community.members?.length || 0,
      postCount: community.posts?.length || 0,
    }));

    res.json(communitiesWithCounts);
  } catch (error) {
    console.error("Error fetching communities:", error);
    res.status(500).json({ error: "Failed to fetch communities" });
  }
};

//delete community
export const deleteCommunity = async (req, res) => {
  const { id } = req.params;

  try {
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found." });
    }

    const gamerId = req.gamer.id; // From auth middleware

    if (!gamerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Ensure the user is the admin of the community
    if (community.admin.toString() !== gamerId.toString()) {
      return res.status(403).json({ message: "Forbidden: Not the admin" });
    }

    // 🔥 Use deleteOne instead of deprecated remove
    await community.deleteOne();

    res.status(200).json({ message: "Community deleted successfully." });
  } catch (error) {
    console.error("Error deleting community:", error);
    res.status(500).json({ message: "Error deleting community.", error });
  }
};
