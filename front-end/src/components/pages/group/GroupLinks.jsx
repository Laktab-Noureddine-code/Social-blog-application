import { NavLink } from "react-router-dom"

function GroupLinks({ groupeId, location }) {
  return (
      <div className="flex md:gap-4 gap-2">
          <NavLink to={`/groups/${groupeId}/about`} className={({ isActive }) =>
              `font-semibold lg:text-lg sm:text-md text-[12px] md:text-md cursor-pointer hover:bg-gray-50 md:px-4 px-2 text-nowrap md:py-2 py-1 ${isActive ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
              À propos
          </NavLink>
          <NavLink to={`/groups/${groupeId}`} className={({ isActive }) =>
              `font-semibold lg:text-lg sm:text-md text-[12px] md:text-md cursor-pointer hover:bg-gray-50 md:px-4 px-2 text-nowrap md:py-2 py-1 ${isActive && location === `/groups/${groupeId}` ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
              Discussion
          </NavLink>
          <NavLink to="members" className={({ isActive }) =>
              `font-semibold lg:text-lg sm:text-md text-[12px] md:text-md cursor-pointer hover:bg-gray-50 md:px-4 px-2 text-nowrap md:py-2 py-1 ${isActive ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
              Personnes
          </NavLink>
          <NavLink to="events" className={({ isActive }) =>
              `font-semibold lg:text-lg sm:text-md text-[12px] md:text-md cursor-pointer hover:bg-gray-50 md:px-4 px-2 text-nowrap md:py-2 py-1 ${isActive ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
              Events
          </NavLink>
      </div>
  )
}

export default GroupLinks
