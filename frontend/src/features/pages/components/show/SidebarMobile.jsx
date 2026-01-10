/* eslint-disable react/prop-types */
// components/SidebarMobile.tsx
import { Button } from "@/shared/ui/button";
import { BadgePlus , User, Shield, ThumbsUp, Layers  } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/tooltip";

const items = [
  { label: "create-page", icon: BadgePlus , path: "/pages/create-page" },
  { label: "Vos pages", icon: User, path: "pages/mes-pages" },
  { label: "Pages administrées", icon: Shield, path: "/pages/admin-pages" },
  { label: "Pages que vous aimez", icon: ThumbsUp, path: "pages/abone-pages" },
  { label: "Autres pages", icon: Layers , path: "/pages/autres-pages" },
];

export function SidebarMobile() {
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
