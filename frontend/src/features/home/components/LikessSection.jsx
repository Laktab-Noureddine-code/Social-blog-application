import { Avatar } from "@/shared/ui/avatar";
import { X, UserPlus, UserMinus, Clock, Check, XIcon } from "lucide-react";
import { useState, useEffect } from "react";
import "../../../style/globale.css";
import { useDispatch, useSelector } from "react-redux";
import api from "@/lib/api";
import {
  refuserInvitation,
  accepterInvitation,
  envoyerInvitation,
  annulerInvitation,
  AnnulerAmis,
} from "./InviationActions";
import CaseFriends from "@/features/posts/components/actions/CaseFriends";

function LikesSection({ postId, toggleSHowLikes, }) {
  const [UersLikes, setUersLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const state = useSelector((state) => state);
  const dispatchEvent = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/api/likes/users/${postId}`);
        setUersLikes(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des likes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [postId]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={toggleSHowLikes}
      ></div>

      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Likes
            </h3>
            <button
              type="button"
              onClick={toggleSHowLikes}
              className="rounded-full p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:bg-neutral-800"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {isLoading
              ? "Loading..."
              : `${UersLikes.length} ${
                  UersLikes.length === 1
                    ? "person liked"
                    : "people liked"
                } this post`}
          </p>
        </div>

        {/* User List */}
        <div className="h-[60vh] overflow-y-auto">
          {isLoading ? (
            // Indicateur de chargement intégré
            <div className="py-12 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full border-4 border-neutral-200 dark:border-neutral-700 border-t-neutral-900 dark:border-t-white animate-spin mb-4"></div>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                Loading likes...
              </p>
            </div>
          ) : UersLikes && UersLikes.length > 0 ? (
            <ul>
              {UersLikes.map((like, index) => (
                <li
                  key={index}
                  className="px-6 py-3 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-150"
                >
                  {/* User Info */}
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      {like.user.image_profile_url ? (
                        <img
                          src={
                            like.user.image_profile_url || "/placeholder.svg"
                          }
                          alt={like.user.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 rounded-full">
                          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                            {like.user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </Avatar>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      {like.user.name}
                    </span>
                  </div>
                  <CaseFriends Id={like.user.id} />

                  {/* Action Buttons with Icons */}
                  {/* {state.amis.friends.some((fr) => fr.id === like.user.id) ? ( */}
                  {/* {state.amis.friends.some((fr) => fr.id === like.user.id) ? (
                    // Already friends
                    <button
                      onClick={() =>
                        AnnulerAmis(
                          like.user.id,
                          state.auth.access_token,
                          dispatchEvent
                        )
                      }
                      className="flex items-center space-x-1 text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                      <UserMinus size={14} />
                      <span>Annuler</span>
                    </button>
                  ) : state.invitation.invitationsEnvoyees.some(
                      (inv) => inv.id === like.user.id
                    ) ? (
                    // Invitation sent
                    <button
                      onClick={() =>
                        annulerInvitation(
                          like.user.id,
                          state.auth.access_token,
                          dispatchEvent
                        )
                      }
                      className="flex items-center space-x-1 text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                      <Clock size={14} />
                      <span>En attente</span>
                    </button>
                  ) : state.invitation.invitationsRecues.some(
                      (inv) => inv.id === like.user.id
                    ) ? (
                    // Invitation received
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          refuserInvitation(
                            like.user.id,
                            state.auth.access_token,
                            dispatchEvent
                          )
                        }
                        className="flex items-center justify-center p-1.5 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:bg-neutral-800"
                      >
                        <XIcon size={14} />
                      </button>
                      <button
                        onClick={() =>
                          accepterInvitation(
                            like.user.id,
                            state.auth.access_token,
                            dispatchEvent
                          )
                        }
                        className="flex items-center justify-center p-1.5 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:bg-neutral-800"
                      >
                        <Check size={14} />
                      </button>
                    </div>
                  ) : (
                    like.user.id !== state.auth.user.id && (
                      // No relation
                      <button
                        onClick={() =>
                          envoyerInvitation(
                            like.user.id,
                            state.auth.access_token,
                            dispatchEvent
                          )
                        }
                        className="flex items-center space-x-1 rounded-full bg-neutral-900 dark:bg-white px-3 py-1.5 text-xs font-medium text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200"
                      >
                        <UserPlus size={14} />
                        <span>Ajouter</span>
                      </button>
                    )
                  )} */}
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-12 text-center text-neutral-500 dark:text-neutral-400">
              <p>No likes yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LikesSection;
