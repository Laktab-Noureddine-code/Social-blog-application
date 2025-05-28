/* eslint-disable react/prop-types */
import { Eye, Globe2, Lock } from "lucide-react";

function GroupPreview({ groupName = "Nom du groupe", confidentiality = "privé", visibility = "visible", groupCover }) {
    return (
        <div className="ml-[36%] w-full h-screen max-h-[99vh] flex justify-center ">
            <div className="w-full max-w-[850px] bg-white rounded-md shadow-2xl  overflow-hidden">
                {/* Group banner */}
                {groupCover ? (
                    <img
                        src={groupCover}
                        alt="Group cover"
                        className="w-full max-h-[300px] object-cover"
                    />
                ) : (
                    <div className="w-full max-h-[300px] overflow-hidden">
                        <svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <rect width="800" height="300" fill="#e5e5e5" />
                            <g transform="translate(50, 50)" opacity="0.6">
                                <path d="M100,100 Q150,50 200,100 T300,100 T400,100 T500,100" fill="none" stroke="#a0a0a0" strokeWidth="2" />
                                <circle cx="100" cy="80" r="30" fill="#c0c0c0" />
                                <circle cx="200" cy="90" r="25" fill="#d0d0d0" />
                                <circle cx="300" cy="70" r="35" fill="#b0b0b0" />
                                <circle cx="400" cy="85" r="28" fill="#c5c5c5" />
                                <rect x="150" y="150" width="200" height="100" rx="10" fill="#b8b8b8" />
                                <path d="M50,200 C100,150 200,250 300,200" fill="none" stroke="#a0a0a0" strokeWidth="3" />
                                <path d="M350,220 C400,170 450,270 500,220" fill="none" stroke="#a0a0a0" strokeWidth="3" />
                                <circle cx="120" cy="180" r="15" fill="#d8d8d8" />
                                <circle cx="420" cy="190" r="18" fill="#d8d8d8" />
                                <rect x="180" y="120" width="30" height="60" fill="#909090" />
                                <rect x="380" y="130" width="25" height="50" fill="#909090" />
                            </g>
                        </svg>
                    </div>
                )}
                {/* Group content */}
                <div className="px-6 pt-4 pb-6">
                    

                    <div className="flex items-center gap-4">
                        <div className="flex justify-between w-full items-center">
                            <div className="flex-1 -mt-2">
                                <h1 className={`text-2xl font-bold ${!groupName && "text-gray-400"}`}>{groupName ? groupName : "Nom du groupe"}</h1>
                                <div className="flex">
                                    <Lock className="w-4 h-4 mr-1" />
                                    <span>
                                        Groupe ({confidentiality === 'privé' ? 'Privé' : 'Public'}) · 1 membre
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation tabs */}
                    <div className="mt-4 border-b border-gray-300">
                        <ul className="flex space-x-6 text-sm text-gray-600">
                            <li className={
                                `font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2  `}>
                                À propos
                            </li>
                            <li className={
                                `font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2  `}>
                                Discussion
                            </li>
                            <li className={
                                `font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2  `}>
                                Personnes
                            </li>
                            <li className={
                                `font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2  `}>
                                Events
                            </li>
                        </ul>
                    </div>

                    {/* À propos block */}
                    <div className="mt-6 border border-gray-200 rounded-lg px-4 py-1">
                        <h3 className="font-semibold text-gray-800 mb-2 text-base">À propos</h3>
                        <div className="text-sm text-gray-700 space-y-2">
                            <div className="flex items-start gap-3">
                                <Globe2 className="h-6 w-6 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="font-bold text-gray-900">{confidentiality}</p>
                                    <p className="text-sm font-semibold text-gray-600">
                                        {confidentiality === "Privé" ?
                                            'Seuls les membres du groupe peuvent voir qui en fait partie et ce qui est publié.'
                                            : 'Tout le monde peut voir qui est dans le groupe et ce qui est publié.'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Eye className="h-6 w-6 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="font-bold text-gray-900">{visibility}</p>
                                    <p className="text-sm font-semibold text-gray-600">
                                        {visibility === "visible" ?
                                            'Tout le monde peut trouver ce groupe.'
                                            : 'Seuls les membres peuvent voir ce groupe.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupPreview;
