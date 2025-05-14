import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import GroupMembersIcons from "./GroupMembersIcons";
import { getNumber, groupCover } from "../../../helpers/helper";
import { useDispatch, useSelector } from 'react-redux';
import { AiFillMessage } from "react-icons/ai";
import { ImageUp } from "lucide-react";
import { RiImageAiFill } from "react-icons/ri";
import { IoIosImages } from "react-icons/io";
import { updateGroup } from "../../../Redux/groupsSlice";

const illustrations = [
    { id: 1, url: "https://i.pinimg.com/736x/b3/a3/2b/b3a32bf4b19c3e620a01778b203d6840.jpg", miniature: "https://i.pinimg.com/736x/b3/a3/2b/b3a32bf4b19c3e620a01778b203d6840.jpg" },
    { id: 2, url: "https://i.pinimg.com/736x/62/14/d3/6214d35470cb10b77080abe43e5e14bb.jpg", miniature: "https://i.pinimg.com/736x/62/14/d3/6214d35470cb10b77080abe43e5e14bb.jpg" },
    { id: 3, url: "https://i.pinimg.com/736x/59/ca/0e/59ca0e78be22648e46b53f685c0ad835.jpg", miniature: "https://i.pinimg.com/736x/59/ca/0e/59ca0e78be22648e46b53f685c0ad835.jpg" },
];

const GroupHeader = ({ group }) => {
    const { groupeId } = useParams();
    const location = useLocation().pathname;
    const token = useSelector(state => state.auth.token);

    const [afficherOptions, setAfficherOptions] = useState(false);
    const [afficherModalIllustrations, setAfficherModalIllustrations] = useState(false);
    const [illustrationSelectionnee, setIllustrationSelectionnee] = useState(null);
    const [afficherConfirmation, setAfficherConfirmation] = useState(false);
    const [fichierSelectionne, setFichierSelectionne] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [chargement, setChargement] = useState(false);
    const refInputFichier = useRef(null);

    const dispatch = useDispatch();

    const handleClicOptions = () => {
        setAfficherOptions(!afficherOptions);
    };

    const handleOuvrirIllustrations = () => {
        setAfficherModalIllustrations(true);
        setAfficherOptions(false);
    };

    const handleSelectionIllustration = (illustration) => {
        setIllustrationSelectionnee(illustration);
        setFichierSelectionne(null);
        setPreviewImage(null);
        setAfficherConfirmation(true);
    };

    const handleImporterPhoto = () => {
        refInputFichier.current.click();
        setAfficherOptions(false);
    };

    const handleChangementFichier = (e) => {
        const fichier = e.target.files[0];
        if (fichier) {
            setFichierSelectionne(fichier);
            setIllustrationSelectionnee(null);

            // Create preview URL
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImage(event.target.result);
            };
            reader.readAsDataURL(fichier);

            setAfficherConfirmation(true);
        }
    };

    const handleConfirmer = async () => {
        if (!illustrationSelectionnee && !fichierSelectionne) return;
        setChargement(true);

        try {
            let updatedCover;

            if (illustrationSelectionnee) {
                const response = await axios.put(
                    `/api/groups/${groupeId}/update-cover`,
                    { cover_image: illustrationSelectionnee.url },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                updatedCover = illustrationSelectionnee.url;
            } else if (fichierSelectionne) {
                const formData = new FormData();
                formData.append('cover_image', fichierSelectionne);

                const response = await axios.put(
                    `/api/groups/${groupeId}/update-cover`,
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                updatedCover = response.data.cover_image;
            }

            dispatch(updateGroup({
                groupId: parseInt(groupeId),
                updatedData: { cover_image: updatedCover },
            }));

            setChargement(false);
            setAfficherConfirmation(false);
            setAfficherModalIllustrations(false);
            setIllustrationSelectionnee(null);
            setFichierSelectionne(null);
            setPreviewImage(null);
        } catch (error) {
            console.error('Error updating cover:', error);
            alert("Erreur lors de la mise à jour de la couverture: " + (error.response?.data?.message || error.message));
            setChargement(false);
        }
    };

    const handleAnnuler = () => {
        setAfficherConfirmation(false);
        setAfficherModalIllustrations(false);
        setIllustrationSelectionnee(null);
        setFichierSelectionne(null);
        setPreviewImage(null);
    };

    return (
        <div className="bg-white border rounded-lg overflow-hidden">
            <div className="h-48 md:h-60 lg:h-90 relative">
                <img
                    src={previewImage || groupCover(group.cover_image)}
                    className="h-full w-full object-cover"
                    alt="Image de couverture du groupe"
                    loading="lazy"
                />

                <div className="absolute bottom-4 right-4">
                    <button
                        onClick={handleClicOptions}
                        className="flex items-center gap-2 bg-gray-100 text-gray-800 cursor-pointer md:px-4 px-2 md:py-2 py-1 rounded-lg shadow-xl hover:bg-gray-100 transition"
                    >
                        <ImageUp size={20} /> Modifier la couverture
                    </button>

                    {afficherOptions && (
                        <div className="absolute right-0 bottom-full w-full mb-2 bg-white rounded-md shadow-lg z-10">
                            <button
                                onClick={handleOuvrirIllustrations}
                                className="flex items-center gap-2 w-full text-left md:px-4 px-2 md:py-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <RiImageAiFill size={20} /> Choisir une illustration
                            </button>
                            <button
                                onClick={handleImporterPhoto}
                                className="flex items-center gap-2 w-full text-left md:px-4 px-2 md:py-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <IoIosImages size={20} /> Importer une photo
                            </button>
                        </div>
                    )}
                </div>

                {afficherConfirmation && (
                    <div className="absolute top-4 right-4 flex space-x-2">
                        <button
                            onClick={handleConfirmer}
                            disabled={chargement}
                            className={`px-3 py-1 rounded-md shadow-lg cursor-pointer text-white ${chargement ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                        >
                            {chargement ? "Chargement..." : "Confirmer"}
                        </button>
                        <button
                            onClick={handleAnnuler}
                            disabled={chargement}
                            className="bg-gray-400 text-white px-3 py-1 rounded-md shadow-lg cursor-pointer hover:bg-gray-600"
                        >
                            Annuler
                        </button>
                    </div>
                )}
            </div>

            <input
                type="file"
                ref={refInputFichier}
                onChange={handleChangementFichier}
                accept="image/*"
                className="hidden"
            />

            {afficherModalIllustrations && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Choisissez une illustration</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {illustrations.map((illustration) => (
                                <div
                                    key={illustration.id}
                                    onClick={() => handleSelectionIllustration(illustration)}
                                    className={`cursor-pointer border-2 ${illustrationSelectionnee?.id === illustration.id ? 'border-blue-500' : 'border-transparent'}`}
                                >
                                    <img
                                        src={illustration.miniature}
                                        alt={`Illustration ${illustration.id}`}
                                        className="w-full md:h-32 h-25 object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button onClick={handleAnnuler} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Annuler</button>
                            <button
                                onClick={handleConfirmer}
                                disabled={!illustrationSelectionnee || chargement}
                                className={`px-4 py-2 rounded-md ${illustrationSelectionnee ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 cursor-not-allowed'}`}
                            >
                                {chargement ? "Chargement..." : "Sélectionner"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="px-4 pt-4">
                <div className="flex items-center gap-4">
                    <div className="flex justify-between w-full items-center">
                        <div className="flex-1 -mt-2">
                            <h1 className="text-2xl font-bold">{group.name}</h1>
                            <p className="text-gray-500">Groupe ({group.confidentiality}) • {getNumber(group.members)} membres</p>
                        </div>
                        <Link to={`/group/chat/${groupeId}`}>
                            <AiFillMessage className="text-gray-500 text-4xl" />
                        </Link>
                    </div>
                </div>
                <div className="flex gap-4 mt-4 border-t pt-4">
                    <NavLink to={`/groups/${groupeId}/about`} className={({ isActive }) =>
                        `font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2 ${isActive ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
                        À propos
                    </NavLink>
                    <NavLink to={`/groups/${groupeId}`} className={({ isActive }) =>
                        `font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2 ${isActive && location === `/groups/${groupeId}` ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
                        Discussion
                    </NavLink>
                    <NavLink to="members" className={({ isActive }) =>
                        `font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2 ${isActive ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
                        Personnes
                    </NavLink>
                    <NavLink to="events" className={({ isActive }) =>
                        `font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2 ${isActive ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
                        Events
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default GroupHeader;