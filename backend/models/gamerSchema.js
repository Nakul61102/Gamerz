import mongoose from "mongoose";

const gamerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  bio: { type: String },
  favoriteGames: { type: [String] },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gamer" }],
  createdAt: { type: Date, default: Date.now },
});

const Gamer = mongoose.model("Gamer", gamerSchema);
export default Gamer;
