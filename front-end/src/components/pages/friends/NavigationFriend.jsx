"use client";

import { Button } from "@/components/ui/button";
import { Users, UserPlus, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      href: "/friends",
      label: "Mes Amis",
      icon: <Users className="h-4 w-4 mr-2" />,
    },
    {
      href: "/friends/mes-invites",
      label: "Mes Invités",
      icon: <UserPlus className="h-4 w-4 mr-2" />,
    },
    {
      href: "/friends/invitations",
      label: "Invitations",
      icon: <Mail className="h-4 w-4 mr-2" />,
    },
    {
      href: "/friends/autres",
      label: "Autres Utilisateurs",
      icon: <User className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="container mx-auto p-4">
        <nav className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/friends" className="text-xl font-bold">
            Mon Réseau Social
          </Link>

          <div className="flex flex-wrap items-center gap-2 max-md:justify-between">
            {navItems.map((item) => (
              <Link to={item.href} key={item.href}>
                <Button
                  variant={currentPath === item.href ? "default" : "ghost"}
                  size="sm"
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
