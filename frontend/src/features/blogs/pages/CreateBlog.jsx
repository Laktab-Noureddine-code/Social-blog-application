/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogEditor from "../components/BlogEditor";
import "../components/BlogPreview.css";
import { useSelector } from "react-redux";
import { MdOutlineGroups } from "react-icons/md";
import { FaRegNewspaper, FaUser } from "react-icons/fa";
import { userProfile, groupCover } from "@/shared/helpers/helper";
import api from "@/lib/api";

const CreateBlog = ({ typeCreator = "user" }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [creatorData, setCreatorData] = useState(null);
  const [hasPermission, setHasPermission] = useState(true);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  const params = useParams();

  const effectiveTypeCreator = params.typeCreator || "user";

  useEffect(() => {
    if (!params.id || !effectiveTypeCreator) return;

    const fetchCreatorData = async () => {
      try {
        let endpoint;
        switch (effectiveTypeCreator) {
          case "group":
            endpoint = `/api/groups/${params.id}`;
            break;
          case "page":
            endpoint = `/api/page/${params.id}`;
            break;
          default:
            endpoint = `/api/user/${params.id}`;
        }

        const response = await api.get(endpoint);

        if (response.status === 200) {
          const data = response.data;
          setCreatorData(data);

          if (effectiveTypeCreator === "group") {
            const isMember =
              data.members &&
              data.members.some((member) => member.id === userData.id);
            setHasPermission(isMember);
          } else if (effectiveTypeCreator === "page") {
            const isCreator = data.page.user_id === userData.id;
            const isAdmin =
              data.page.admins &&
              data.page.admins.some((admin) => admin.page.id === userData.id);
            setHasPermission(isCreator || isAdmin);
          }
        }
      } catch (error) {
        console.error(
          `Erreur lors de la récupération des données ${effectiveTypeCreator}:`,
          error
        );
      }
    };
    fetchCreatorData();
  }, [effectiveTypeCreator, params.id, userData.id]);

  const renderCreatorInfo = () => {
    if (!hasPermission) {
      return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {effectiveTypeCreator === "group"
                  ? "Vous ne pouvez pas créer un blog dans un groupe dont vous n'êtes pas membre."
                  : "Vous ne pouvez pas créer un blog sur cette page car vous n'êtes ni le créateur ni un administrateur."}
              </p>
            </div>
          </div>
        </div>
      );
    }

    const getCreatorIcon = () => {
      if (effectiveTypeCreator === "group")
        return <MdOutlineGroups className="text-blue-500" />;
      if (effectiveTypeCreator === "page")
        return <FaRegNewspaper className="text-purple-500" />;
      return <FaUser className="text-gray-500" />;
    };

    const getCreatorImage = () => {
      if (effectiveTypeCreator === "user") {
        return userProfile(userData?.image_profile_url);
      } else if (effectiveTypeCreator === "group" && creatorData) {
        return groupCover(creatorData.cover_image);
      } else if (effectiveTypeCreator === "page" && creatorData?.page) {
        return creatorData.page.profile_image_url || "/default-avatar.png";
      }
      return "/default-avatar.png";
    };

    const getCreatorName = () => {
      if (effectiveTypeCreator === "user") return userData?.name;
      if (effectiveTypeCreator === "group") return creatorData?.name;
      if (effectiveTypeCreator === "page") return creatorData?.page?.name;
      return "";
    };

    return (
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={getCreatorImage()}
              alt={getCreatorName()}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-avatar.png";
              }}
            />
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-xs">
              {getCreatorIcon()}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-900">
                {effectiveTypeCreator === "group"
                  ? `Groupe : ${getCreatorName()}`
                  : getCreatorName()}
              </h3>
            </div>

            <div className="flex items-center text-sm text-gray-500 mt-1">
              <span>Publié par : {userData?.name}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handlePublish = async () => {
    if (!title || !content || !hasPermission) return;

    setIsPublishing(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      if (coverImageFile) {
        formData.append("cover_image", coverImageFile);
      }

      let creatorType = "App\\Models\\User";
      let creatorId = userData?.id;

      if (effectiveTypeCreator === "group") {
        creatorType = "App\\Models\\Group";
        creatorId = params.id || creatorData?.id;
      } else if (effectiveTypeCreator === "page") {
        creatorType = "App\\Models\\Page";
        creatorId = params.id || creatorData?.page?.id;
      }

      formData.append("creator_id", creatorId);
      formData.append("creator_type", creatorType);
      formData.append("created_by", userData?.id);

      const response = await api.post("/api/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/blogs/" + response.data.blog?.id);
    } catch (error) {
      console.error("Erreur lors de la publication du blog :", error);
      alert("Échec de la publication du blog. Veuillez réessayer.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Veuillez sélectionner un fichier image valide");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
      setCoverImageFile(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Créer un nouvel article
        </h1>

        {renderCreatorInfo()}

        {hasPermission && (
          <>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Entrez le titre de votre blog"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image de couverture
                </label>
                <div className="flex flex-col space-y-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-gray-100 file:text-gray-700
                      hover:file:bg-gray-200"
                  />
                  {coverImage && (
                    <div className="mt-2">
                      <img
                        src={coverImage}
                        alt="Aperçu de l’image de couverture"
                        className="max-h-60 w-auto rounded-md object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contenu *
                </label>
                <div className="border border-gray-300 rounded-md overflow-hidden">
                  <BlogEditor blog={content} setBlog={setContent} />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => navigate("/blogs")}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Annuler
                </button>
                <button
                  onClick={handlePublish}
                  disabled={isPublishing || !title || !content}
                  className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isPublishing || !coverImage || !title || !content
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isPublishing ? "Publication en cours..." : "Publier"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;
