import { useState, useEffect } from "react";
import { updateProfile } from "../api";
import { toast } from "react-toastify";

const EditProfileModal = ({ isOpen, onClose, profileData, onUpdateSuccess }) => {
  const [form, setForm] = useState({
    username: "",
    bio: "",
    favoriteGames: "",
    avatar: ""
  });

  useEffect(() => {
    if (profileData) {
      setForm({
        username: profileData.username || "",
        bio: profileData.bio || "",
        favoriteGames: profileData.favoriteGames || "",
        avatar: profileData.avatar || ""
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = profileData._id;
      const updated = await updateProfile(userId, form);
      toast.success("Profile updated!");
      onUpdateSuccess(updated);
      onClose();
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md text-white">
        <h2 className="text-2xl mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="bg-gray-700 p-2 rounded"
          />
          <textarea
            name="bio"
            placeholder="Bio"
            value={form.bio}
            onChange={handleChange}
            className="bg-gray-700 p-2 rounded"
          />
          <input
            type="text"
            name="favoriteGames"
            placeholder="Favorite Games"
            value={form.favoriteGames}
            onChange={handleChange}
            className="bg-gray-700 p-2 rounded"
          />
          <input
            type="text"
            name="avatar"
            placeholder="Avatar URL"
            value={form.avatar}
            onChange={handleChange}
            className="bg-gray-700 p-2 rounded"
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
