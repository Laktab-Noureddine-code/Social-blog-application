/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function NavItem({ icon, label, id, active, onClick, to }) {
    return (
      <Link to={to}>
    <div
      className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors ${
        active ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <div className="w-6 h-6 flex items-center justify-center mr-3">
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
    </Link>
  );
}
export default NavItem;
