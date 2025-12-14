/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { accepterInvitation, AnnulerAmis, annulerInvitation, envoyerInvitation, refuserInvitation } from '../../../utils/invitationActions'
import { Check, Clock, UserMinus, UserPlus, XIcon } from 'lucide-react'

function CaseFriends({Id}) {
    const dispatchEvent = useDispatch()
    const state = useSelector((state) => state)
  return (
    state.amis.friends.some((fr) => fr.id === Id) ? (
        // Already friends
        <button
          onClick={() =>
            AnnulerAmis(
              Id,
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
          (inv) => inv.id === Id
        ) ? (
        // Invitation sent
        <button
          onClick={() =>
            annulerInvitation(
              Id,
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
          (inv) => inv.id === Id
        ) ? (
        // Invitation received
        <div className="flex space-x-2">
          <button
            onClick={() =>
              refuserInvitation(
                Id,
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
                Id,
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
        Id !== state.auth.user.id && (
          // No relation
          <button
            onClick={() =>
              envoyerInvitation(
                Id,
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
      )
  )
}

export default CaseFriends