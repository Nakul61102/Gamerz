import Post from "../models/postSchema.js";
import Community from "../models/communitySchema.js";


export const createPost = async (req, res) => {
  const { content, image } = req.body;
  const io = req.app.get("io"); // ✅ grab io instance

  try {
    let post;
      post = new Post({
        user: req.gamer.id,
        content,
        image,
      });

      await post.save();
    

    // ✅ Real-time broadcast
    const fullPost = await Post.findById(post._id).populate("user", "username avatar");
io.emit("newPost", fullPost);

    res.status(201).json({ message: "Post created successfully!", fullPost });
  } catch (error) {
    console.error("Create Post Error:", error); 
    res.status(500).json({ message: "Error creating post.", error });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username avatar") // Fetch username and avatar of the post creator
      .sort({ createdAt: -1 }); // Sort posts by newest first

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts.", error });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const user = req.gamer.id; // Assuming user ID is available via authentication middleware
    const userPosts = await Post.find({ user });
    res.json(userPosts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
    console.log("this is error : ", error);
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.params;
  const io = req.app.get("io"); // Get Socket.IO instance

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Optional: check if the user deleting is the creator
    if (post.user.toString() !== req.gamer.id) {
      return res.status(403).json({ message: "Unauthorized to delete this post." });
    }

    await Post.findByIdAndDelete(postId);

    // Emit deletion to all connected clients
    io.emit("postDeleted", postId);

    res.status(200).json({ message: "Post deleted successfully.", postId });
  } catch (error) {
    console.error("Delete Post Error:", error);
    res.status(500).json({ message: "Error deleting post.", error });
  }
};


export const likePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const gamerId = req.gamer.id;

    if (!gamerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Toggle like/unlike
    const alreadyLiked = post.likes.includes(gamerId);
    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== gamerId.toString());
    } else {
      post.likes.push(gamerId);
    }

    await post.save();

    res.status(200).json({
      message: alreadyLiked ? "Post unliked successfully!" : "Post liked successfully!",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing like/unlike.", error });
  }
};


export const getPostsByCommunity = async (req, res) => {
  const { communityId } = req.params;

  try {
    const community = await Community.findById(communityId).populate({
      path: "posts",
      populate: { path: "user", select: "username avatar" },
    });

    if (!community) {
      return res.status(404).json({ message: "Community not found." });
    }

    res.status(200).json({ posts: community.posts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts.", error });
  }
};
