import { useDispatch, useSelector } from "react-redux";
import Unknown from "@/features/home/components/Unknown";
import { UserMinus, Shield } from "lucide-react";
import AddAdminPage from "./AddAminPage";
import SkeletonAdmins from "@/shared/components/skeletons/SkeletonAdmins";
import { removeAdminPage } from "@/Redux/PageSlice";
import api from "@/lib/api";

const AdminsTab = () => {

  const page = useSelector((state) => state.page);
  const user = useSelector((state) => state.auth.user);
  const dispatchEvent = useDispatch();
  const isOwner = page.page.user_id === user.id;

   const removeAdmin = async (id) => {
     try {
       const response = await api.delete(`/api/removeAdmin/${page.page.id}/${id}`);
       dispatchEvent(removeAdminPage(response.data));
     } catch (error) {
       console.error("Error removing admin:", error);
     }
   };


   if (page.loding) {
     return <SkeletonAdmins />;
   }
  if (!page.admins) {
    return (
      <div className="flex items-center justify-center h-40 bg-gray-50 rounded-xl">
        <p className="text-gray-500 italic">Aucun administrateur trouvé</p>
      </div>
    );
  }
  

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          Administrateurs
          <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
            {page.admins.length}
          </span>
        </h3>
      </div>

      <div className="space-y-3">
        {page.admins.map((admin) => (
          <div
            key={admin.id}
            className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-lg border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                {admin.image_profile_url ? (
                  <img
                    src={admin.image_profile_url || "/placeholder.svg"}
                    alt={`Photo de ${admin.name}`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12">
                    <Unknown />
                  </div>
                )}
                {page.user_id === admin.id && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 p-1 rounded-full w-5 h-5 flex items-center justify-center">
                    <Shield className="w-3 h-3 text-white" />
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{admin.name}</span>
                <span className="text-xs text-gray-500">
                  {page.user_id === admin.id
                    ? "Propriétaire"
                    : "Administrateur"}
                </span>
              </div>
            </div>
            {isOwner && page.user_id !== admin.id && (
              <button
                className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center gap-1 text-sm font-medium border border-transparent hover:border-red-200"
                onClick={() => removeAdmin(admin.id)}
              >
                <UserMinus className="w-4 h-4" />
                Retirer
              </button>
            )}
          </div>
        ))}
      </div>

      {isOwner && <AddAdminPage page={page.page} />}
    </div>
  );
};

export default AdminsTab;