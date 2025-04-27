import mongoose from "mongoose";

const cummunitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "Gamer", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gamer" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  description: { type: String },

  createdAt: { type: Date, default: Date.now },
});


const Community = mongoose.model("Community", cummunitySchema);
export default Community;