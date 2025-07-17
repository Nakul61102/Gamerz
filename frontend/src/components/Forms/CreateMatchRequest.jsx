import { useState } from "react";
import { createMatchPost } from "../../api";

const CreateMatchModal = ({ isOpen, onClose, onMatchCreated, communityId }) => {
  const [game, setGame] = useState("");
  const [preferredRole, setPreferredRole] = useState("");
  const [rankOrLevel, setRankOrLevel] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [gameTime, setGameTime] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      setError("User not authenticated.");
      return;
    }

    // Basic Validation
    if (!game || !preferredRole || !rankOrLevel || !lookingFor || !gameTime) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await createMatchPost({
        communityId,
        userId: user.id,
        game,
        preferredRole,
        rankOrLevel,
        lookingFor,
        gameTime,
      });

      onMatchCreated(response.match);
      onClose();
    } catch (err) {
      console.error("Error creating match:", err);
      setError("Failed to create match request.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md text-white shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">🎮 Create Match Request</h2>

        {error && <p className="text-red-400 text-sm text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Game Name"
            className="w-full p-3 rounded bg-gray-700"
            value={game}
            onChange={(e) => setGame(e.target.value)}
          />

          <input
            type="text"
            placeholder="Preferred Role"
            className="w-full p-3 rounded bg-gray-700"
            value={preferredRole}
            onChange={(e) => setPreferredRole(e.target.value)}
          />

          <input
            type="text"
            placeholder="Rank or Level"
            className="w-full p-3 rounded bg-gray-700"
            value={rankOrLevel}
            onChange={(e) => setRankOrLevel(e.target.value)}
          />

          <input
            type="text"
            placeholder="Looking For (e.g. Support, Duo, Squad)"
            className="w-full p-3 rounded bg-gray-700"
            value={lookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
          />

          <div className="flex flex-col text-sm">
            <label htmlFor="gameTime" className="text-gray-300 mb-1">Select Game Time</label>
            <input
              type="datetime-local"
              id="gameTime"
              className="p-3 rounded bg-gray-700 text-white"
              value={gameTime}
              onChange={(e) => setGameTime(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Match ON
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMatchModal;
