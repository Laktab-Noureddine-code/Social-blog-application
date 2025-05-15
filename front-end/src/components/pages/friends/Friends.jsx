import { useState } from "react";
import { UserPlus, Users, MessageSquarePlus } from "lucide-react";
import UserCard from "../user/UserCard";

// Mock data for the three sections
const mockData = {
  amis: [
    { id: 1, name: "Hamza El" },
    { id: 2, name: "Sophie Martin" },
    { id: 3, name: "Ahmed Khan" }
  ],
  invitations: [
    { id: 4, name: "Thomas Leclerc" },
    { id: 5, name: "Marie Dubois" }
  ],
  suggestions: [
    { id: 6, name: "Antoine Bernard" },
    { id: 7, name: "Julie Lefebvre" },
    { id: 8, name: "Nicolas Petit" }
  ]
};

const Friends = () => {
  const [activeTab, setActiveTab] = useState("amis");

  return (
    <div className="p-4">
      {/* Tab navigation */}
      <div className="flex border-b mb-6">
        <button
          className={`flex items-center px-4 py-2 ${activeTab === "amis" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("amis")}
        >
          <Users className="w-4 h-4 mr-2" />
          Amis
        </button>
        <button
          className={`flex items-center px-4 py-2 ${activeTab === "invitations" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("invitations")}
        >
          <MessageSquarePlus className="w-4 h-4 mr-2" />
          Invitations
        </button>
        <button
          className={`flex items-center px-4 py-2 ${activeTab === "suggestions" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("suggestions")}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Suggestions
        </button>
      </div>

      {/* Cards grid */}
      <div className="flex flex-wrap -mx-2">
        {activeTab === "amis" && mockData.amis.map(user => (
          <UserCard key={user.id} user={user} />
        ))}

        {activeTab === "invitations" && mockData.invitations.map(user => (
          <UserCard key={user.id} user={user} />
        ))}

        {activeTab === "suggestions" && mockData.suggestions.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Friends;