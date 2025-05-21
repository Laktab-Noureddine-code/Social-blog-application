/* eslint-disable react/prop-types */
// components/SidebarDesktop.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

        <Card className="bg-gray-50 dark:bg-gray-900 mb-4 p-3 border border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <span className="font-medium">Meta Business Suite</span>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8"
            >
              <span className="sr-only">{"Plus d'infos"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </Button>
          </div>
        </Card>

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
