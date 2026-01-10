/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import api from "@/lib/api";
import { ImageUp, Settings, Trash2, Edit } from "lucide-react";
import { RiImageAiFill } from "react-icons/ri";
import { IoIosImages } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { groupCover } from "@/shared/helpers/helper";
import { removeGroup, updateGroup } from "@/Redux/groupsSlice";
import GroupSettingsModal from "../models/GroupSettingsModal";
import DeleteGroupModal from "../models/DeleteGroupModal";
const illustrations = [
  {
    id: 1,
    url: "https://i.pinimg.com/736x/b3/a3/2b/b3a32bf4b19c3e620a01778b203d6840.jpg",
    miniature:
      "https://i.pinimg.com/736x/b3/a3/2b/b3a32bf4b19c3e620a01778b203d6840.jpg",
  },
  {
    id: 2,
    url: "https://i.pinimg.com/736x/62/14/d3/6214d35470cb10b77080abe43e5e14bb.jpg",
    miniature:
      "https://i.pinimg.com/736x/62/14/d3/6214d35470cb10b77080abe43e5e14bb.jpg",
  },
  {
    id: 3,
    url: "https://i.pinimg.com/736x/59/ca/0e/59ca0e78be22648e46b53f685c0ad835.jpg",
    miniature:
      "https://i.pinimg.com/736x/59/ca/0e/59ca0e78be22648e46b53f685c0ad835.jpg",
  },
];
function GroupCover({ group }) {
  const { groupeId } = useParams();
  const currentUserId = useSelector((state) => state.auth.user.id);
  const navigate = useNavigate();

  const [afficherOptions, setAfficherOptions] = useState(false);
  const [afficherModalIllustrations, setAfficherModalIllustrations] =
    useState(false);
  const [illustrationSelectionnee, setIllustrationSelectionnee] =
    useState(null);

  const [afficherConfirmation, setAfficherConfirmation] = useState(false);
  const [fichierSelectionne, setFichierSelectionne] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [chargement, setChargement] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const refInputFichier = useRef(null);

  const dispatch = useDispatch();

  // Check if current user is admin or creator
  const isAdminOrCreator =
    group.created_by === currentUserId ||
    group.members.some(
      (m) => m.id === currentUserId && m.pivot.role === "admin"
    );

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

  const [imageBase64, setImageBase64] = useState(null);

  const handleChangementFichier = (e) => {
    const fichier = e.target.files[0];
    if (fichier) {
      setFichierSelectionne(fichier);
      setIllustrationSelectionnee(null);

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setPreviewImage(base64String);
        setImageBase64(base64String);
      };
      reader.readAsDataURL(fichier);

      setAfficherConfirmation(true);
    }
  };

  const handleConfirmer = async () => {
    if (!illustrationSelectionnee && !imageBase64) return;
    setChargement(true);

    try {
      let updatedCover;

      if (illustrationSelectionnee) {
        // Illustration already has URL
        await api.put(
          `/api/groups/${groupeId}/update-cover`,
          { cover_image: illustrationSelectionnee.url }
        );
        updatedCover = illustrationSelectionnee.url;
      } else if (imageBase64) {
        // Image is in base64
        await api.put(
          `/api/groups/${groupeId}/update-cover`,
          { cover_image: imageBase64 }
        );
        updatedCover = imageBase64;
      }

      // Update Redux store
      dispatch(
        updateGroup({
          groupId: parseInt(groupeId),
          updatedData: { cover_image: updatedCover },
        })
      );

      // Reset state
      setChargement(false);
      setAfficherConfirmation(false);
      setAfficherModalIllustrations(false);
      setIllustrationSelectionnee(null);
      setFichierSelectionne(null);
      setImageBase64(null);
      setPreviewImage(null);
    } catch (error) {
      console.error("Error updating cover:", error);
      alert(
        "Erreur lors de la mise à jour de la couverture: " +
          (error.response?.data?.message || error.message)
      );
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

  const handleDeleteGroup = async (groupName) => {
    try {
      await api.delete(`/api/groups/${group.id}`);
      dispatch(removeGroup(group.id));
      navigate("/groups/list"); // Redirect to groups page after deletion
    } catch (error) {
      console.error("Error deleting group:", error);
      alert(
        "Erreur lors de la suppression du groupe: " +
          (error.response?.data?.message || error.message)
      );
    }
  };
  console.log(groupCover(group.cover_image))
  return (
    <>
      <div className="relative h-48 md:h-60 lg:h-90 ">
        <img
          // src={previewImage || groupCover(group.cover_image)}
          src={groupCover(group.cover_image)}
          className="h-full w-full object-cover"
          alt="Image de couverture du groupe"
          loading="lazy"
        />
        {/* Add linear gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/14 to-transparent"></div>

        {isAdminOrCreator && (
          <div className="absolute top-5 right-5">
            <button
              onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
              className="flex items-center border justify-center gap-2 bg-gray-100 text-gray-800 cursor-pointer md:px-2 px-1 md:py-2 py-1 rounded-full shadow-xl hover:bg-gray-100 transition"
            >
              <Settings size={25} />
            </button>

            {showSettingsDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <button
                  onClick={() => {
                    setShowSettingsModal(true);
                    setShowSettingsDropdown(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(true);
                    setShowSettingsDropdown(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </button>
              </div>
            )}
          </div>
        )}

        <div className="absolute bottom-4 right-4 flex space-x-2">
          {isAdminOrCreator && (
            <button
              onClick={handleClicOptions}
              className="flex relative border items-center gap-2 bg-gray-100 text-gray-800 cursor-pointer md:px-4 px-2 md:py-2 py-1 rounded-lg shadow-xl hover:bg-gray-100 transition"
            >
              <ImageUp size={20} /> Modifier la couverture
            </button>
          )}

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
              className={`px-3 py-1 rounded-md shadow-lg cursor-pointer text-white ${
                chargement
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
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
            <h2 className="text-xl font-bold mb-4">
              Choisissez une illustration
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {illustrations.map((illustration) => (
                <div
                  key={illustration.id}
                  onClick={() => handleSelectionIllustration(illustration)}
                  className={`cursor-pointer border-2 ${
                    illustrationSelectionnee?.id === illustration.id
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
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
              <button
                onClick={handleAnnuler}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmer}
                disabled={!illustrationSelectionnee || chargement}
                className={`px-4 py-2 rounded-md ${
                  illustrationSelectionnee
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {chargement ? "Chargement..." : "Sélectionner"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Group Settings Modal */}
      {isAdminOrCreator && (
        <>
          <GroupSettingsModal
            group={group}
            isOpen={showSettingsModal}
            onClose={() => setShowSettingsModal(false)}
            token={token}
          />
          <DeleteGroupModal
            group={group}
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onDelete={handleDeleteGroup}
          />
        </>
      )}
    </>
  );
}

export default GroupCover;
