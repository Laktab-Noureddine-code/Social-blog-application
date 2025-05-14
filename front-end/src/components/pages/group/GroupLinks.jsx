import { NavLink } from "react-router-dom"

function GroupLinks({ groupeId, location }) {
  return (
      <div className="flex gap-4 mt-4 border-t pt-4">
          <NavLink to={`/groups/${groupeId}/about`} className={({ isActive }) =>
              `font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2 ${isActive ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
              À propos
          </NavLink>
          <NavLink to={`/groups/${groupeId}`} className={({ isActive }) =>
              `font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2 ${isActive && location === `/groups/${groupeId}` ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
              Discussion
          </NavLink>
          <NavLink to="members" className={({ isActive }) =>
              `font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2 ${isActive ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
              Personnes
          </NavLink>
          <NavLink to="events" className={({ isActive }) =>
              `font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2 ${isActive ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
              Events
          </NavLink>
      </div>
  )
}

export default GroupLinks
