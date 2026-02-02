import { useSelector } from "react-redux"
import Unknown from "@/features/home/components/Unknown";

function Amis() {
  const state = useSelector(state => state.profile)
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Friends</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {state.amis.map((amie) => (
          <div
            key={amie.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-40 bg-gray-100">
              {amie.image_profile_url ? (
                <img
                  src={amie.image_profile_url}
                  alt={`Photo of ${amie.name}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150?text=Photo";
                  }}
                />
              ) : (
                <Unknown />
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{amie.name}</h3>

              <button
                onClick={() => console.log("annuler")}
                className="w-full mt-2 px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors duration-200 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9l-6 6M12 9l6 6"
                  />
                </svg>
                Remove Friend
              </button>
            </div>
          </div>
        ))}
      </div>

      {state.amis.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          You don't have any friends yet.
        </div>
      )}
    </div>
  );
}

export default Amis;
