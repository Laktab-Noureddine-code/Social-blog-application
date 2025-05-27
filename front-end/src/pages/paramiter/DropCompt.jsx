import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, Eye, EyeOff, AlertTriangle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { logout } from "../../Redux/authSlice";

function DropCompt() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.access_token);
  const dispatch = useDispatch();

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      setError(
        "Veuillez entrer votre mot de passe pour confirmer la suppression."
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/delete-account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Échec de la suppression du compte.");
      }
      setSuccess(true);
      setPassword("");

      toast.success("Compte supprimé avec succès", {
        description: "Votre compte et toutes vos données ont été supprimés.",
        duration: 3000,
      });

      setTimeout(() => {
        dispatch(logout());
      }, 2000);
    } catch (error) {
      setError(error.message || "Une erreur est survenue. Veuillez réessayer.");
      console.error("Erreur de suppression du compte :", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">
              Compte supprimé
            </CardTitle>
            <CardDescription className="text-gray-600">
              Votre compte a été supprimé avec succès.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Vous allez être redirigé vers la page d'accueil...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Supprimer le compte
          </CardTitle>
          <CardDescription className="text-gray-600">
            Cette action est irréversible. Toutes vos données seront supprimées
            définitivement.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleDeleteAccount}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Confirmation du mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe pour confirmer"
                  className="pr-10"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Attention :</strong> Cette action supprimera
                définitivement votre compte et toutes les données associées.
                Cette opération ne peut pas être annulée.
              </AlertDescription>
            </Alert>
          </CardContent>

          <CardFooter className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              disabled={isLoading}
              onClick={() => navigate(-1)}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="destructive"
              className="flex-1"
              disabled={isLoading || !password.trim()}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Suppression...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer le compte
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default DropCompt;
