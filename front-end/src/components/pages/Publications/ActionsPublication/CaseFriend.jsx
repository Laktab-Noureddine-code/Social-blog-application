/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import {
  accepterInvitation,
  AnnulerAmis,
  annulerInvitation,
  envoyerInvitation,
  refuserInvitation,
} from "../../../utils/invitationActions";
import { Check, Clock, UserMinus, UserPlus, XIcon } from "lucide-react";

function CaseFriend({ Id }) {
  const dispatchEvent = useDispatch();
  const state = useSelector((state) => state);
  return state.amis.friends.some((fr) => fr.id === Id) ? (
    // Already friends
    <button
      onClick={() => AnnulerAmis(Id, state.auth.access_token, dispatchEvent)}
      className="group relative overflow-hidden px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-300 ease-out w-full bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
    >
      <div className="flex items-center gap-2 ">
        <>
          <UserMinus
            size={18}
            className="transition-transform group-hover:scale-110"
          />
          <span>Annuler</span>
        </>
      </div>
      <p className="text-xs text-gray-500">
        Vous êtes déjà amis. Cliquez pour annuler.
      </p>
    </button>
  ) : state.invitation.invitationsEnvoyees.some((inv) => inv.id === Id) ? (
    // Invitation sent
    <button
      onClick={() =>
        annulerInvitation(Id, state.auth.access_token, dispatchEvent)
      }
      className="group relative overflow-hidden px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-300 ease-out w-full bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
    >
      <div className="flex items-center gap-2 ">
        <>
          <Clock
            size={18}
            className="transition-transform group-hover:scale-110"
          />

          <span>En attente</span>
        </>
      </div>
      <p className="text-xs text-gray-500">
        Invitation en attente. Cliquez pour annuler.
      </p>
    </button>
  ) : state.invitation.invitationsRecues.some((inv) => inv.id === Id) ? (
    // Invitation received
    <div className="flex space-x-2">
      <button
        onClick={() =>
          refuserInvitation(Id, state.auth.access_token, dispatchEvent)
        }
        className="group relative overflow-hidden px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-300 ease-out w-full bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      >
        <div className="flex items-center gap-2 ">
          <>
            <XIcon
              size={18}
              className="transition-transform group-hover:scale-110"
            />

            <span>Refuser</span>
          </>
        </div>
        <p className="text-xs text-gray-500">Refuser cette demande d’ami.</p>
      </button>
      <button
        onClick={() =>
          accepterInvitation(Id, state.auth.access_token, dispatchEvent)
        }
        className="group relative overflow-hidden px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-300 ease-out w-full bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      >
        <div className="flex items-center gap-2 ">
          <>
            <Check
              size={18}
              className="transition-transform group-hover:scale-110"
            />

            <span>Accepter</span>
          </>
        </div>
        <p className="text-xs text-gray-500">
          Accepter la demande et devenir amis.
        </p>
      </button>
    </div>
  ) : (
    Id !== state.auth.user.id && (
      // No relation
      <button
        onClick={() =>
          envoyerInvitation(Id, state.auth.access_token, dispatchEvent)
        }
        className="group relative overflow-hidden px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-300 ease-out w-full bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      >
        <div className="flex items-center gap-2 ">
          <>
            <UserPlus
              size={18}
              className="transition-transform group-hover:scale-110"
            />
            <span>Ajouter</span>
          </>
        </div>
        <p className="text-xs text-gray-500">Envoyer une demande d’amis.</p>
      </button>
    )
  );
}

export default CaseFriend;
