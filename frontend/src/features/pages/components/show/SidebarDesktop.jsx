/* eslint-disable react/prop-types */
// components/SidebarDesktop.tsx
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { useLocation, Link } from "react-router-dom";
import {
  Youtube,
  Plus,
  Layers,
  UserRoundCheck,
  ShieldUser,
} from "lucide-react";

export function SidebarDesktop() {
  const currentPath = useLocation().pathname;

  return (
    <div className="w-80 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-black hidden xl:block overflow-y-auto">
      <div className="p-4">
        <Link to={'/pages/create-page'} className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 mb-6 p-4 rounded-md">
          <Plus className="h-4 w-4" />
          <span>Créer une nouvelle page </span>
        </Link>

        

        <div className="space-y-1 mb-6 flex flex-col">
          <SidebarButton
            label="Vos pages"
            path="/pages/mes-pages"
            currentPath={currentPath}
            icon={<Youtube className="h-5 w-5" />}
          />
          <SidebarButton
            label="Pages administrées"
            path="pages/admin-pages"
            currentPath={currentPath}
            icon={<ShieldUser />}
          />
          <SidebarButton
            label="Pages que vous aimez"
            path="pages/abone-pages"
            currentPath={currentPath}
            icon={<UserRoundCheck />}
          />
          <SidebarButton
            label="Autres pages"
            path="/pages/autres-pages"
            currentPath={currentPath}
            icon={<Layers />}
          />
        </div>
      </div>
    </div>
  );
}

function SidebarButton({ label, icon, path, currentPath }) {
  const isActive = currentPath.includes(path);
  return (
    <Link
      to={path}
      variant={isActive ? "default" : "ghost"}
      className={`flex w-full justify-between p-4 rounded-md ${
        isActive ? "bg-blue-600 hover:bg-blue-700 text-white" : ""
      }`}
    >
      <span>{label}</span>
      {icon}
    </Link>
  );
}
