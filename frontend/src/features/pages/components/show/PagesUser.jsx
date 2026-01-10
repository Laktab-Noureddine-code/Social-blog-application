// /* eslint-disable react/prop-types */

// import { useState } from "react";
// import { Plus, Trash, RefreshCw } from "lucide-react";
// import { useSelector } from "react-redux";
// import Unknown from "@/features/home/components/Unknown";
// import CreatePost from "@/components/pages/Publications/CreatePost";
// import { Button } from "@/shared/ui/button";
// import { Card } from "@/shared/ui/card";
// import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";
// import { Link, useNavigate } from "react-router-dom";

// export default function PagesUser({
//   onCreatePost = () => console.log("Créer un post"),
//   onDeletePage = () => console.log("Supprimer la page"),
// }) {
//   const my_pages = useSelector((state) => state.pages.my_pages);
//   const navigate = useNavigate();
//   const [open, setOpen] = useState();
//   const [activeTab, setActiveTab] = useState("create");

//   return (
//     <div className="p-3">
//       {my_pages.map((page) => (
//         <div className="w-full max-w-3xl mx-auto " key={page.id}>
//           {/* Top Bar */}
//           <div className="flex items-center justify-between bg-white px-6 py-4 rounded-t-xl shadow-sm border-b border-gray-100">
//             <div className="flex items-center gap-3">
//               <Link to={`/page/${page.id}`} className="h-15 w-15 rounded-full">
//                 {page.profile_image_url ? (
//                   <img
//                     src={page.profile_image_url}
//                     alt=""
//                     className="h-15 w-15 rounded-full object-cover"
//                   />
//                 ) : (
//                   <Unknown />
//                 )}
//               </Link>
//               <div>
//                 <Link
//                   to={`/page/${page.id}`}
//                   className="font-bold text-black hover:underline "
//                 >
//                   {page.name}
//                 </Link>
//                 <p className="text-xs text-gray-500">
//                   {page.followers_count ? page.followers_count : 0} Abonne
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="flex bg-gray-50 border-b border-gray-200">
//             <button
//               onClick={() => setActiveTab("create")}
//               className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
//                 activeTab === "create"
//                   ? "text-blue-600 border-b-2 border-blue-600 bg-white"
//                   : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//               }`}
//             >
//               <Plus size={16} />
//               <span>Créer</span>
//             </button>
//             <button
//               onClick={() => setActiveTab("delete")}
//               className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
//                 activeTab === "delete"
//                   ? "text-blue-600 border-b-2 border-blue-600 bg-white"
//                   : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//               }`}
//             >
//               <Trash size={16} />
//               <span>Supprimer</span>
//             </button>
//             <button
//               onClick={() => setActiveTab("update")}
//               className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
//                 activeTab === "update"
//                   ? "text-blue-600 border-b-2 border-blue-600 bg-white"
//                   : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//               }`}
//             >
//               <RefreshCw size={16} />
//               <span className="text-xs sm:text-sm">Mettre à jour</span>
//             </button>
//           </div>

//           {/* Content Area */}
//           <div className="bg-white p-6 rounded-b-xl shadow-sm">
//             {activeTab === "create" && (
//               <Card className="mb-4 p-4 space-y-4">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     Créer un nouveau post
//                   </h3>
//                   <p className="text-gray-600 text-sm">
//                     Créez et publiez un nouveau contenu sur votre page.
//                   </p>
//                 </div>

//                 <Sheet open={open} onOpenChange={setOpen}>
//                   <SheetTrigger asChild>
//                     <Button
//                       onClick={onCreatePost}
//                       size="sm"
//                       type="button"
//                       className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2.5 w-full flex items-center justify-center gap-2 font-medium"
//                     >
//                       <Plus size={18} />
//                       <span>Créer un post</span>
//                     </Button>
//                   </SheetTrigger>

//                   <SheetContent
//                     side="top"
//                     className="!p-0 flex justify-center items-center h-screen bg-transparent max-w-[500px] m-auto"
//                   >
//                     <div className="md:p-10">
//                       <CreatePost
//                         onOpenChange={setOpen}
//                         id_page={page.id}
//                         type={"page"}
//                       />
//                     </div>
//                   </SheetContent>
//                 </Sheet>
//               </Card>
//             )}

//             {activeTab === "delete" && (
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   Supprimer cette page
//                 </h3>
//                 <p className="text-gray-600 text-sm">
//                   Attention: Cette action est irréversible et supprimera
//                   définitivement votre page.
//                 </p>
//                 <button
//                   onClick={onDeletePage}
//                   className="w-full py-2.5 bg-black hover:bg-gray-900 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
//                 >
//                   <Trash size={18} />
//                   <span>Supprimer la page</span>
//                 </button>
//               </div>
//             )}

//             {activeTab === "update" && (
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   Mettre à jour la page
//                 </h3>
//                 <p className="text-gray-600 text-sm">
//                   Actualisez votre page pour afficher les dernières
//                   modifications.
//                 </p>
//                 <button
//                   onClick={() => {
//                     navigate(`/page/${page.id}/update`);
//                   }}
//                   className="w-full py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
//                 >
//                   <RefreshCw size={18} />
//                   <span>Mettre à jour maintenant</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


/* eslint-disable react/prop-types */
import { useState } from "react";
import { Plus, Trash, RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Unknown from "@/features/home/components/Unknown";
import CreatePost from "@/features/posts/components/CreatePost";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog";
import { removeMyPage } from "@/Redux/PagesSlice";

export default function PagesUser({
  onCreatePost = () => console.log("Créer un post"),
}) {
  const my_pages = useSelector((state) => state.pages.my_pages);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState();
  const [activeTab, setActiveTab] = useState("create");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [pageToDelete, setPageToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePage = async (pageId) => {
    setIsDeleting(true);
    try {
      const res = await api.delete(`/api/page/${pageId}`);
      dispatch(removeMyPage(pageId));
      console.log(res.data)

      // Optionnel : rafraîchir ou rediriger après suppression
      // navigate("/pages");
    // } catch (error) {
    //   console.error("Error deleting page:", error);
    //   // Optionnel : afficher un toast ou une alerte d'erreur
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };


  const openDeleteDialog = (page) => {
    setPageToDelete(page);
    setShowDeleteDialog(true);
  };

  return (
    <div className="p-3">
      {/* Dialogue de confirmation de suppression */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action supprimera définitivement la page "{pageToDelete?.name}" 
              et toutes ses publications. Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeletePage(pageToDelete?.id)}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Suppression..." : "Supprimer définitivement"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {my_pages.map((page) => (
        <div className="w-full max-w-3xl mx-auto " key={page.id}>
          {/* Top Bar */}
          <div className="flex items-center justify-between bg-white px-6 py-4 rounded-t-xl shadow-sm border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Link to={`/page/${page.id}`} className="h-15 w-15 rounded-full">
                {page.profile_image_url ? (
                  <img
                    src={page.profile_image_url}
                    alt=""
                    className="h-15 w-15 rounded-full object-cover"
                  />
                ) : (
                  <Unknown />
                )}
              </Link>
              <div>
                <Link
                  to={`/page/${page.id}`}
                  className="font-bold text-black hover:underline "
                >
                  {page.name}
                </Link>
                <p className="text-xs text-gray-500">
                  {page.followers_count ? page.followers_count : 0} Abonne
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-50 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("create")}
              className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                activeTab === "create"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Plus size={16} />
              <span>Créer</span>
            </button>
            <button
              onClick={() => setActiveTab("delete")}
              className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                activeTab === "delete"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Trash size={16} />
              <span>Supprimer</span>
            </button>
            <button
              onClick={() => setActiveTab("update")}
              className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                activeTab === "update"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <RefreshCw size={16} />
              <span className="text-xs sm:text-sm">Mettre à jour</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="bg-white p-6 rounded-b-xl shadow-sm">
            {activeTab === "create" && (
              <Card className="mb-4 p-4 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Créer un nouveau post
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Créez et publiez un nouveau contenu sur votre page.
                  </p>
                </div>

                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <Button
                      onClick={onCreatePost}
                      size="sm"
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2.5 w-full flex items-center justify-center gap-2 font-medium"
                    >
                      <Plus size={18} />
                      <span>Créer un post</span>
                    </Button>
                  </SheetTrigger>

                  <SheetContent
                    side="top"
                    className="!p-0 flex justify-center items-center h-screen bg-transparent max-w-[500px] m-auto"
                  >
                    <div className="md:p-10">
                      <CreatePost
                        onOpenChange={setOpen}
                        id_page={page.id}
                        type={"page"}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </Card>
            )}

            {activeTab === "delete" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Supprimer cette page
                </h3>
                <p className="text-gray-600 text-sm">
                  Attention: Cette action est irréversible et supprimera
                  définitivement votre page.
                </p>
                <button
                  onClick={() => openDeleteDialog(page)}
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Trash size={18} />
                  <span>Supprimer la page</span>
                </button>
              </div>
            )}

            {activeTab === "update" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Mettre à jour la page
                </h3>
                <p className="text-gray-600 text-sm">
                  Actualisez votre page pour afficher les dernières
                  modifications.
                </p>
                <button
                  onClick={() => {
                    navigate(`/page/${page.id}/update`);
                  }}
                  className="w-full py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw size={18} />
                  <span>Mettre à jour maintenant</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}