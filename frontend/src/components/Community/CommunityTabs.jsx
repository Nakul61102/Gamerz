const CommunityTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "events", label: "📅 Events" },
    { key: "matchmaking", label: "🤝 Matchmaking" },
  ];

  return (
    <div className="flex justify-center md:justify-start mt-6 border-b border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-4 py-2 font-medium transition-all duration-200 ${
            activeTab === tab.key
              ? "text-white border-b-2 border-blue-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default CommunityTabs;
