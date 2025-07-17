import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCommunityById } from "../../api";
import CommunityHeader from "./Header";
import CommunityTabs from "./CommunityTabs";
import EventList from "./EventList";
import MatchmakingList from "./Matchmaking";
import CreateEvent from "../Forms/CreateEvent";
import CreateMatchModal from "../Forms/CreateMatchRequest";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

const CommunityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [community, setCommunity] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [showForm, setShowForm] = useState(false);

  // ✅ Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showForm ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showForm]);

  // ✅ Load community details
  useEffect(() => {
    const loadCommunity = async () => {
      try {
        const data = await fetchCommunityById(id);
        setCommunity(data);
      } catch (err) {
        toast.error("Failed to load community");
        console.error("Error loading community:", err);
      }
    };
    if (id) loadCommunity();
  }, [id]);

  if (!community) {
    return <p className="text-center text-white mt-8">Loading community...</p>;
  }

  // ✅ Tab switch
  const renderTabContent = () => {
    switch (activeTab) {
      case "events":
        return <EventList communityId={id} />;
      case "matchmaking":
        return <MatchmakingList communityId={id} />;
      default:
        return null;
    }
  };

  // ✅ Show popup form
  const renderCreateForm = () => {
    if (!showForm) return null;

    if (activeTab === "events") {
      return (
        <CreateEvent
          communityId={id}
          onClose={() => setShowForm(false)}
          onCreated={() => setShowForm(false)}
        />
      );
    }

    if (activeTab === "matchmaking") {
      return (
        <CreateMatchModal
          isOpen={showForm}
          communityId={id}
          onClose={() => setShowForm(false)}
          onCreated={() => setShowForm(false)} // ✅ Use correct prop name
        />
      );
    }

    return null;
  };

  return (
    <div className="w-full p-4 md:p-8 text-white bg-gray-900 min-h-screen">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-blue-400 hover:text-white transition"
      >
        <FaArrowLeft className="mr-2" /> Back to Communities
      </button>

      <CommunityHeader community={community} />
      <CommunityTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ➕ Create Button */}
      {(activeTab === "events" || activeTab === "matchmaking") && (
        <div className="mb-6 text-right">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            {activeTab === "events" ? "Create Event" : "Create Match"}
          </button>
        </div>
      )}

      {/* 📄 Main Content */}
      <div className="mt-4">
        {renderTabContent()}
        {renderCreateForm()}
      </div>
    </div>
  );
};

export default CommunityDetails;
