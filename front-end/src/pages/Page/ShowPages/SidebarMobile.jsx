/* eslint-disable react/prop-types */
// components/SidebarMobile.tsx
import { Button } from "@/components/ui/button";
import { Search, User, Shield, ThumbsUp, FolderPlus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const items = [
  { label: "Explorer", icon: Search, path: "/explore" },
  { label: "Vos pages", icon: User, path: "/your-pages" },
  { label: "Pages administrées", icon: Shield, path: "/admin-pages" },
  { label: "Pages que vous aimez", icon: ThumbsUp, path: "/following-pages" },
  { label: "Autres pages", icon: FolderPlus, path: "/other-pages" },
];

export function SidebarMobile({ setShowExplore }) {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  return (
    <div className="flex justify-around border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-2 xl:hidden z-50">
      {items.map(({ label, icon: Icon, path }) => {
        const isActive = currentPath.includes(path);
        return (
          <Tooltip key={path}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${
                  isActive ? "bg-blue-600 text-white" : ""
                }`}
                onClick={() => {
                  if (path === "/explore") setShowExplore(true);
                  else setShowExplore(false);
                  navigate(path);
                }}
              >
                <Icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <span>{label}</span>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
