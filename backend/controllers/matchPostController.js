import e from "express";
import Match from "../models/MatchPost.js";

export const createMatchPost = async (req, res) => {
  try {
    const { communityId, game, preferredRole, rankOrLevel, lookingFor, gameTime } = req.body;

    const newMatch = new Match({
      communityId,
      user: req.gamer.id,
      game,
      preferredRole,
      rankOrLevel,
      lookingFor,
      gameTime,
    });

    const savedMatch = await newMatch.save();
    res.status(201).json(savedMatch);

  } catch (error) {
    console.error("Error creating match post:", error);
    res.status(500).json({ message: "Error creating match post", error });
  }
};



export const getCommunityMatchPosts = async (req, res) => {
  try {
    const { communityId } = req.params;
    const matches = await Match.find({ communityId }).populate("user", "username avatarUrl");
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching match posts", error });
  }
};


export const joinMatchPost = async (req, res) => {
  try {
    const { matchId } = req.params;
    const gamerId = req.gamer.id; // Assuming user ID is stored in req.user by auth middleware

    // Find the match and update it to add the user to the participants array
    // using $addToSet, which only adds the element if it doesn't already exist.
    const match = await Match.findByIdAndUpdate(
      matchId,
      { $addToSet: { participants: gamerId } },
      { new: true } // Return the updated document
    );

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    // After the update, check if the participant was actually added.
    // If the participant was already there, $addToSet would not modify the array.
    // We can compare the length of the participants array before and after,
    // or simply rely on the fact that if $addToSet didn't add it, the user was already present.
    // For a clear message, we can still do a check.
    if (!match.participants.includes(gamerId)) {
      // This scenario would happen if the user was already a participant.
      return res.status(400).json({ message: "You are already a participant in this match" });
    }

    res.status(200).json({ message: "Successfully joined the match", match });
  } catch (error) {
    console.error("Error joining match:", error); // Log the error for debugging
    res.status(500).json({ message: "Error joining match", error: error.message }); // Send error message
  }
};