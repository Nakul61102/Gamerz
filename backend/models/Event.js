import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  game: { type: String, required: true },
  dateTime: { type: Date, required: true },
  maxPlayers: { type: Number },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gamer" }],
  bannerImage: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Gamer", required: true },
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
