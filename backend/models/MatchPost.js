import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gamer",
    required: true,
  },
  game: { type: String, required: true },
  preferredRole: { type: String },
  rankOrLevel: { type: String },
  lookingFor: { type: String },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gamer",
  }],
  gameTime: { type: String }, // Optional field for game time
  
}, { timestamps: true });

export default mongoose.model("Match", matchSchema);
