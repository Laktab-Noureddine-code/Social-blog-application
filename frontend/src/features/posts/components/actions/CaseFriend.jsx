/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import {
  accepterInvitation,
  AnnulerAmis,
  annulerInvitation,
  envoyerInvitation,
  refuserInvitation,
} from "@/shared/helpers/invitationActions";
import { Check, Clock, UserMinus, UserPlus, XIcon } from "lucide-react";

function CaseFriend({ Id }) {
  const dispatchEvent = useDispatch();
  const state = useSelector((state) => state);
  console.log(Id)
  return state.amis.friends.some((fr) => fr.id === Id) ? (
    // Already friends
    <button
      onClick={() => AnnulerAmis(Id, dispatchEvent)}
      className="group relative overflow-hidden px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-300 ease-out w-full bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
    >
      <div className="flex items-center gap-2 ">
        <>
          <UserMinus
            size={18}
            className="transition-transform group-hover:scale-110"
          />
          <span>Unfriend</span>
        </>
      </div>
      <p className="text-xs text-gray-500">
        You are already friends. Click to unfriend.
      </p>
    </button>
  ) : state.invitation.invitationsEnvoyees.some((inv) => inv.id === Id) ? (
    // Invitation sent
    <button
      onClick={() =>
        annulerInvitation(Id, dispatchEvent)
      }
      className="group relative overflow-hidden px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-300 ease-out w-full bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
    >
      <div className="flex items-center gap-2 ">
        <>
          <Clock
            size={18}
            className="transition-transform group-hover:scale-110"
          />

          <span>Pending</span>
        </>
      </div>
      <p className="text-xs text-gray-500">
        Invitation pending. Click to cancel.
      </p>
    </button>
  ) : state.invitation.invitationsRecues.some((inv) => inv.id === Id) ? (
    // Invitation received
    <div className="flex space-x-2">
      <button
        onClick={() =>
          refuserInvitation(Id, dispatchEvent)
        }
        className="group relative overflow-hidden px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-300 ease-out w-full bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      >
        <div className="flex items-center gap-2 ">
          <>
            <XIcon
              size={18}
              className="transition-transform group-hover:scale-110"
            />

            <span>Decline</span>
          </>
        </div>
        <p className="text-xs text-gray-500">Decline this friend request.</p>
      </button>
      <button
        onClick={() =>
          accepterInvitation(Id, dispatchEvent)
        }
        className="group relative overflow-hidden px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-300 ease-out w-full bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      >
        <div className="flex items-center gap-2 ">
          <>
            <Check
              size={18}
              className="transition-transform group-hover:scale-110"
            />

            <span>Accept</span>
          </>
        </div>
        <p className="text-xs text-gray-500">
          Accept the request and become friends.
        </p>
      </button>
    </div>
  ) : (
    Id !== state.auth.user.id && (
      // No relation
      <button
        onClick={() =>
          envoyerInvitation(Id, dispatchEvent)
        }
        className="group relative overflow-hidden px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-300 ease-out w-full bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      >
        <div className="flex items-center gap-2 ">
          <>
            <UserPlus
              size={18}
              className="transition-transform group-hover:scale-110"
            />
            <span>Add Friend</span>
          </>
        </div>
        <p className="text-xs text-gray-500">Send a friend request.</p>
      </button>
    )
  );
}

export default CaseFriend;
