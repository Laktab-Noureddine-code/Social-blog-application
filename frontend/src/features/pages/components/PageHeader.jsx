

// export default PageHeader;


import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  ImageUp, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import UnknownCoverPhoto from "@/features/home/components/UnknownCoverPhoto";
import Unknown from "@/features/home/components/Unknown";
import { formatNumber } from "@/shared/helpers/helper";
import { ConfirmationModal } from "@/features/profile/pages/ConfirmationModal";
import { getPage } from "@/Redux/PageSlice";
import api from "@/lib/api";

function PageHeader() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.page);
  const stateAuth = useSelector((state) => state.auth);

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      state.admins.map((admin) => {
        if (admin.id === stateAuth.user.id) {
          setIsAdmin(true);
        }
      });
    }, [stateAuth, state]);

  const coverInputRef = useRef(null);
  const profileInputRef = useRef(null);


  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [pendingCoverUpload, setPendingCoverUpload] = useState(null);
  const [pendingProfileUpload, setPendingProfileUpload] = useState(null);

  const [isCoverUploading, setIsCoverUploading] = useState(false);
  const [isProfileUploading, setIsProfileUploading] = useState(false);

  const handleUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result.split(",")[1];
      if (type === "cover") {
        setPendingCoverUpload(base64Image);
        setIsCoverModalOpen(true);
      } else {
        setPendingProfileUpload(base64Image);
        setIsProfileModalOpen(true);
      }
    };
    reader.onerror = () => alert("Erreur lors de la lecture du fichier");
  };

  const confirmCoverUpload = async () => {
    if (!pendingCoverUpload) return;
    setIsCoverUploading(true);

    try {
      const response = await api.put(`/api/page/cover/${state.page.id}`, {
        image: pendingCoverUpload,
      });
      dispatch(getPage(response.data));
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Failed to update cover photo");
    } finally {
      setIsCoverUploading(false);
      setIsCoverModalOpen(false);
      setPendingCoverUpload(null);
    }
  };

  const confirmProfileUpload = async () => {
    if (!pendingProfileUpload) return;
    setIsProfileUploading(true);

    try {
      const response = await api.put(`/api/page/profile-image/${state.page.id}`, {
        image: pendingProfileUpload,
      });
      dispatch(getPage(response.data));
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Failed to update profile photo");
    } finally {
      setIsProfileUploading(false);
      setIsProfileModalOpen(false);
      setPendingProfileUpload(null);
    }
  };

  return (
    state.page.id && (
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm relative">
        <div className="h-37 md:h-48 lg:h-72 relative">
          {state.page.cover_image_url ? (
            <img
              src={state.page.cover_image_url}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <UnknownCoverPhoto />
          )}

          <div className="absolute bottom-0 left-0 right-0 md:h-40 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

          {(stateAuth.user.id === state.page.user_id || isAdmin) && (
            <div className="absolute bottom-4 right-4 ">
              <label className="relative inline-flex">
                <div
                  className={`flex items-center justify-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg shadow-xl hover:bg-gray-200 transition ${
                    isCoverUploading
                      ? "opacity-70 cursor-not-allowed"
                      : "cursor-pointer"
                  } max-w-[260px]`}
                >
                  <ImageUp
                    size={20}
                    className={isCoverUploading ? "animate-bounce" : ""}
                  />
                  <span className="hidden md:block">
                    {isCoverUploading
                      ? "Envoi en cours..."
                      : "Modifier la couverture"}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={coverInputRef}
                  onChange={(e) =>
                    !isCoverUploading && handleUpload(e, "cover")
                  }
                  className="absolute inset-0 w-full h-full opacity-0 overflow-hidden"
                  disabled={isCoverUploading}
                />
              </label>
            </div>
          )}
        </div>

        <div className="flex md:relative justify-between md:flex-row flex-col items-center gap-4 px-5 -mt-16">
          <div className="relative w-[80%]">
            <div className="relative rounded-full border-4 bg-gray-900 border-gray-200  md:h-35 md:w-35 h-28 w-28">
              {state.page.profile_image_url ? (
                <img
                  src={state.page.profile_image_url}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Unknown />
              )}

              {(stateAuth.user.id === state.page.user_id || isAdmin) && (
                <button
                  onClick={() => profileInputRef.current.click()}
                  className="  flex items-center shadow-lg justify-center w-10 h-10 bg-white rounded-full cursor-pointer border absolute md:top-22 md:left-27 top-17 left-20"
                  disabled={isProfileUploading}
                >
                  <Settings color="black" size={20} />
                </button>
              )}
              <input
                type="file"
                accept="image/*"
                ref={profileInputRef}
                onChange={(e) => handleUpload(e, "profile")}
                className="hidden"
                disabled={isProfileUploading}
              />
            </div>
            <div className="md:absolute md:bottom-8 left-40 flex flex-col gap-3 top-15">
              <h1 className="text-xl md:text-xl lg:text-3xl font-bold text-gray-800 mt-1 w-full">
                {state.page.name}
              </h1>
              <p className="md:ml-2 text-gray-400 font-mono text-sm p-0 relative top-[-18px]">
                {formatNumber(+state.followersCount || 0)} Abonnés
              </p>
            </div>
          </div>
        </div>

{/* <<<<<<< HEAD */}
        <div className="flex flex-wrap md:-mt-10 justify-center md:justify-end gap-4 px-5 md:pt-10 py-4 border-b border-gray-200">
          {[
            { label: "Publications", path: "" },
            { label: "Articles", path: "/articles" },
            { label: "Settings", path: `/settings/admins` },
            { label: "Les Photos", path: "/images" },
            { label: "Les Videos", path: "/videos" },
          ].map(({ label, path }, index) => (
            <div className="text-center" key={index}>
              <Link
                to={`/page/${state.page.id}${path}`}
                className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
              >
                {label}
              </Link>
            </div>
          ))}
{/* ======= */}
        {/* Stats */}
        {/* <div className="flex flex-wrap md:-mt-10 justify-center md:justify-end gap-4 px-5 md:pt-10 py-4 border-b border-gray-200 ">
          <div className="text-center">
            <Link
              to={`/page/${state.page.id}`}
              className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
            >
              Publications
            </Link>
          </div>
          <div className="text-center">
            <Link
              to={`/page/${state.page.id}/articles`}
              className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
            >
              Articles
            </Link>
          </div>
          <div className="text-center">
            <Link
              className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
              to={`/page/${state.page.id}/settings/admins`}
            >
              Settings
            </Link>
          </div>
          <div className="text-center">
            <Link
              to={`/page/${state.page.id}/images`}
              className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
            >
              Les Photos
            </Link>
          </div>
          <div className="text-center">
            <Link
              to={`/page/${state.page.id}/videos`}
              className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
            >
              Les Videos
            </Link>
          </div> */}
{/* >>>>>>> 1fc7c82a87fac63603f53d9f7e30ac5ccac045dd */}
        </div>

        {/* Modals */}
        <ConfirmationModal
          isOpen={isCoverModalOpen}
          onClose={() => {
            setIsCoverModalOpen(false);
            setPendingCoverUpload(null);
          }}
          onConfirm={confirmCoverUpload}
          title="Modifier la photo de couverture"
          message="Voulez-vous vraiment modifier cette photo de couverture ?"
          confirmText={isCoverUploading ? "Envoi en cours..." : "Modifier"}
          cancelText="Annuler"
          isConfirming={isCoverUploading}
        />

        <ConfirmationModal
          isOpen={isProfileModalOpen}
          onClose={() => {
            setIsProfileModalOpen(false);
            setPendingProfileUpload(null);
          }}
          onConfirm={confirmProfileUpload}
          title="Modifier la photo de profil"
          message="Voulez-vous vraiment modifier cette photo de profil ?"
          confirmText={isProfileUploading ? "Envoi en cours..." : "Modifier"}
          cancelText="Annuler"
          isConfirming={isProfileUploading}
        />
      </div>
    )
  );
}

export default PageHeader;