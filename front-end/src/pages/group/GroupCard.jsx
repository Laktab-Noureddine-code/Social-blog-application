import { Link } from "react-router-dom";
import { groupProfile } from "../../helpers/helper";

function GroupCard({ group }) {
    const isPublic = group.confidentiality === "public";

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden w-full border border-gray-200">
            {/* Cover image */}
            <div className="h-30 w-full relative">
                <img
                    src={groupProfile(group.cover_image)}
                    alt="Cover"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Card content */}
            <div className="pt-10 pb-4 text-center px-4">
                <h2 className="text-xl font-semibold truncate">{group.name}</h2>
                {/* Optional: afficher le nombre de membres ? */}
                <p className="text-gray-500 text-sm">{group.members.length} membres</p>
                {/* Buttons */}
                <div className="mt-3 flex justify-center items-center gap-4">
                    {isPublic ? (
                        <button className="bg-blue-600 p-2 text-white text-sm   rounded cursor-pointer hover:bg-blue-700 transition">
                            Rejoindre le groupe
                        </button>
                    ) : (
                        <button className="bg-yellow-500  text-white text-sm  p-2 rounded cursor-pointer hover:bg-yellow-600 transition">
                            Demander l’accès
                        </button>
                    )}
                    <Link
                        to={`/groups/${group.id}`}
                        className="text-gray-500 p-2 bg-gray-100 text-sm  hover:text-gray-700 transition"
                    >
                        Afficher le groupe
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default GroupCard;
