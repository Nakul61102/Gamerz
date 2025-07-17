import { useState } from "react";
import { createEvent } from "../../api";
import { toast } from "react-toastify";

const CreateEvent = ({ communityId, onClose, onCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(communityId, { title, description, date });
      toast.success("Event created successfully!");
      onCreated && onCreated();
    } catch (err) {
      console.error("Error creating event:", err);
      toast.error("Failed to create event");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-white text-lg font-bold mb-4">Create Event</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-800 text-white"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full p-2 rounded bg-gray-800 text-white"
            placeholder="Description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            className="w-full p-2 rounded bg-gray-800 text-white"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;


