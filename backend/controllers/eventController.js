import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, game, dateTime, maxPlayers, bannerImage, communityId } = req.body;
    const createdBy = req.gamer.id;

    const event = new Event({
      title,
      description,
      game,
      dateTime,
      maxPlayers,
      bannerImage,
      createdBy,
      communityId,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

export const getCommunityEvents = async (req, res) => {
  try {
    const { communityId } = req.params;
    const events = await Event.find({ communityId }).populate("participants", "username");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

export const joinEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.gamer.id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (!event.participants.includes(userId)) {
      event.participants.push(userId);
      await event.save();
    }

    res.status(200).json({ message: "Joined event", event });
  } catch (error) {
    res.status(500).json({ message: "Error joining event", error });
  }
};
