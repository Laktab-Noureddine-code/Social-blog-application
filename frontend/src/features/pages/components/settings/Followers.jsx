import { useDispatch, useSelector } from "react-redux";
import { Users, UserMinus, Search, X } from "lucide-react";
import { useState, useMemo } from "react";
import GetRelativeTime from "@/features/home/components/GetRelativeTimes";
import Unknown from "@/features/home/components/Unknown";
import SkeletonFollowers from "@/shared/components/skeletons/SkeletonFollowers";
import { removeFolloersPage } from "@/Redux/PageSlice";
import api from "@/lib/api";

const FollowersTab = () => {
  const page = useSelector((state) => state.page);
  const [searchTerm, setSearchTerm] = useState("");
  
  const dispatchEvent = useDispatch();

  const DropFollower = async (id) => {
    try {
      const response = await api.delete(`/api/deleteFollowers/${page.page.id}/${id}`);
      dispatchEvent(removeFolloersPage(response.data));
    } catch (error) {
      console.error("Error removing follower:", error);
    }
  };

  // Filtrer les abonnés en fonction du terme de recherche
  const filteredFollowers = useMemo(() => {
    if (!page.followers) return [];

    if (!searchTerm.trim()) return page.followers;

    const normalizedSearch = searchTerm.toLowerCase().trim();
    return page.followers.filter((follower) =>
      follower.name.toLowerCase().includes(normalizedSearch)
    );
  }, [page.followers, searchTerm]);

  // Gérer le changement dans le champ de recherche
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Effacer la recherche
  const clearSearch = () => {
    setSearchTerm("");
  };

  if (page.loding) {
    return  <SkeletonFollowers/>
  }
  if (!page.followers || page.followers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 bg-gray-50 rounded-xl text-center p-6">
        <Users className="h-10 w-10 text-gray-300 mb-2" />
        <p className="text-gray-500 font-medium">Aucun abonné pour le moment</p>
        <p className="text-gray-400 text-sm mt-1">
          Les abonnés apparaîtront ici
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-600" />
          Abonnés
          <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
            {filteredFollowers.length}{" "}
            {filteredFollowers.length !== page.followers.length &&
              `sur ${page.followers.length}`}
          </span>
        </h3>

        <div className="relative w-full sm:w-auto">
          <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Rechercher un abonné"
            className="pl-9 pr-9 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 w-full"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {filteredFollowers.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-32 bg-gray-50 rounded-lg text-center p-4">
          <p className="text-gray-500 font-medium">
            {`Aucun résultat pour "${searchTerm}"`}
          </p>
          <button
            onClick={clearSearch}
            className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Effacer la recherche
          </button>
        </div>
      ) : (
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50">
          {filteredFollowers.map((follower) => (
            <div
              key={follower.id}
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-lg border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="overflow-hidden w-12 h-12 rounded-full">
                  {follower.image_profile_ur ? (
                    <img
                      src={follower.image_profile_ur || "/placeholder.svg"}
                      alt={`Photo de ${follower.name}`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  ) : (
                    <Unknown />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">
                    {searchTerm
                      ? highlightMatch(follower.name, searchTerm)
                      : follower.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    Abonné depuis {GetRelativeTime(follower.pivot.created_at)}
                  </span>
                </div>
              </div>
              <button
                className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center gap-1 text-sm font-medium border border-transparent hover:border-red-200"
                onClick={() => DropFollower(follower.id)}
              >
                <UserMinus className="w-4 h-4" />
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}

      {filteredFollowers.length > 10 && !searchTerm && (
        <div className="flex justify-center pt-2">
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            Voir tous les abonnés
          </button>
        </div>
      )}
    </div>
  );
};

// Fonction pour mettre en évidence les correspondances de recherche
const highlightMatch = (text, searchTerm) => {
  if (!searchTerm.trim()) return text;

  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <span key={index} className="bg-yellow-200">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

export default FollowersTab;
