import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

const ParamiterComponent = () => {
    const page = useSelector(state=>state.page.page)
//   const auth = useSelector((state) => state.auth);

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <nav className="flex w-full gap-4">
        <NavLink
          to={`/page/${page.id}/settings/admins`}
          className={({ isActive }) =>
            `border-b-2 px-1 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-gray-900 text-gray-900 dark:border-gray-100 dark:text-white"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
            }`
          }
        >
          Administrateurs
        </NavLink>
        <NavLink
          to={`/page/${page.id}/settings/followers`}
          className={({ isActive }) =>
            `border-b-2 px-1 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-gray-900 text-gray-900 dark:border-gray-100 dark:text-white"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
            }`
          }
        >
          Abonnés
        </NavLink>
        <NavLink
          to={`/page/${page.id}/settings/edit`}
          className={({ isActive }) =>
            `border-b-2 px-1 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-gray-900 text-gray-900 dark:border-gray-100 dark:text-white"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
            }`
          }
        >
          Modifier la page
        </NavLink>
      </nav>

      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
};
export default ParamiterComponent;