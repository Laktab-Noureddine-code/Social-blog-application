/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

function GroupLinks({ groupeId, location }) {
  const currentUser = useSelector(state => state.auth.user);
  const currentGroup = useSelector(state => state.groups.currentGroup);
  
  // Check if user is a member with accepted status
  const userMembership = currentGroup?.members?.find(m => m.id === currentUser?.id)?.pivot;
  const isMember = !!userMembership && userMembership.status === 'accepted';

  return (
      <div className="flex md:gap-4 gap-2">
          <NavLink to={`/groups/${groupeId}/about`} className={({ isActive }) =>
              `font-semibold lg:text-lg sm:text-md text-[12px] md:text-md cursor-pointer hover:bg-gray-50 md:px-4 px-2 text-nowrap md:py-2 py-1 ${isActive ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
              À propos
          </NavLink>
          {isMember && (
            <>
              <NavLink to={`/groups/${groupeId}`} className={({ isActive }) =>
                  `font-semibold lg:text-lg sm:text-md text-[12px] md:text-md cursor-pointer hover:bg-gray-50 md:px-4 px-2 text-nowrap md:py-2 py-1 ${isActive && location === `/groups/${groupeId}` ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
                  Publications
              </NavLink>
              <NavLink to={`/groups/${groupeId}/articles`} className={({ isActive }) =>
                  `font-semibold lg:text-lg sm:text-md text-[12px] md:text-md cursor-pointer hover:bg-gray-50 md:px-4 px-2 text-nowrap md:py-2 py-1 ${isActive ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
                  Articles
              </NavLink>
            </>
          )}
          <NavLink to="members" className={({ isActive }) =>
              `font-semibold lg:text-lg sm:text-md text-[12px] md:text-md cursor-pointer hover:bg-gray-50 md:px-4 px-2 text-nowrap md:py-2 py-1 ${isActive ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
              Personnes
          </NavLink>
      </div>
  )
}

export default GroupLinks
