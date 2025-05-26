import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Key,
  Trash2,
  User,
  ChevronRight,
  AlertTriangle,
//   Shield,
//   Bell,
//   Palette,
//   Globe,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function SettingsPage() {
    const state = useSelector(state => state);
    const navigate = useNavigate();

  const handleNavigation = (section) => {
      navigate("/les paramiter/supprimer profile");
    // Ici vous pouvez ajouter la logique de navigation
    console.log(`Navigation vers: ${section}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
              <p className="text-slate-600">
                Gérez votre compte et vos préférences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid gap-6">
          {/* Section Compte */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-900">Compte</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Changer mot de passe */}
              <Link to={"/les paramiter/changer mot de pass"}>
                <Card
                  className="hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => handleNavigation("change-password")}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Key className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            Changer le mot de passe
                          </CardTitle>
                          <CardDescription className="text-sm">
                            Modifiez votre mot de passe actuel
                          </CardDescription>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Sécurité
                      </Badge>
                      <span className="text-xs text-slate-500">
                        Dernière modification: Il y a 30 jours
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Informations du profil */}
              <Link to={`/profile/${state.auth.user.id}/update`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            Informations du profil
                          </CardTitle>
                          <CardDescription className="text-sm">
                            Modifiez vos informations personnelles
                          </CardDescription>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Profil
                      </Badge>
                      <span className="text-xs text-slate-500">
                        {state.auth.user.email}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          <Separator />

          {/* //Section Préférences 
          < className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-900">
                Préférences
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              // Notifications 
              <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Bell className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          Notifications
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Gérez vos préférences de notification
                        </CardDescription>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Activées
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              // Langue et région 
              <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          Langue et région
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Définissez votre langue et fuseau horaire
                        </CardDescription>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Français (FR)
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </> */}

          <Separator />

          {/*// Section Sécurité 
          < className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-900">Sécurité</h2>
            </div>

            <div className="grid gap-4">
              //</div>Sessions actives
               <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          Sessions actives
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Gérez vos sessions et appareils connectés
                        </CardDescription>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      3 appareils
                    </Badge>
                    <span className="text-xs text-slate-500">
                      Dernière activité: Maintenant
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </> */}

          <Separator />

          {/* Section Danger Zone */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-semibold text-red-900">
                Zone de danger
              </h2>
            </div>

            <Card className="border-red-200 bg-red-50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base text-red-900">
                        Supprimer le compte
                      </CardTitle>
                      <CardDescription className="text-sm text-red-700">
                        Supprimez définitivement votre compte et toutes vos
                        données
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="text-xs">
                      Action irréversible
                    </Badge>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleNavigation("delete-account")}
                    className="hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>© 2024 Mon Application. Tous droits réservés.</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-slate-700 transition-colors">
                Aide
              </a>
              <a href="#" className="hover:text-slate-700 transition-colors">
                Confidentialité
              </a>
              <a href="#" className="hover:text-slate-700 transition-colors">
                Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
