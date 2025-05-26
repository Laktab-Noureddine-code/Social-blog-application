// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Trash2, Eye, EyeOff, AlertTriangle } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// function DropCompt() {
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const navigat = useNavigate();

//   const handleDelete = async (e) => {
//     e.preventDefault();

//     if (!password.trim()) {
//       setError("Veuillez saisir votre mot de passe");
//       return;
//     }

//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await fetch("/api/delete-account", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         if (response.status === 401) {
//           setError("Mot de passe incorrect. Veuillez réessayer.");
//         } else {
//           setError(data.message || "Une erreur est survenue");
//         }
//         return;
//       }

//       setSuccess(true);
//       setPassword("");

//       // Redirection ou autre action après suppression réussie
//       setTimeout(() => {
//         alert("Compte supprimé avec succès");
//         // window.location.href = '/login'
//       }, 1500);
//     } catch (error) {
//       setError("Erreur de connexion au serveur");
//       console.error("Erreur:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (success) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
//         <Card className="w-full max-w-md">
//           <CardContent className="pt-6">
//             <div className="text-center space-y-4">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
//                 <svg
//                   className="w-8 h-8 text-green-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-slate-900">
//                 Suppression réussie
//               </h3>
//               <p className="text-slate-600">
//                 Votre compte a été supprimé avec succès.
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Trash2 className="w-8 h-8 text-red-600" />
//           </div>
//           <CardTitle className="text-xl font-bold text-slate-900">
//             Supprimer le compte
//           </CardTitle>
//           <CardDescription className="text-slate-600">
//             Cette action est irréversible. Confirmez avec votre mot de passe.
//           </CardDescription>
//         </CardHeader>

//         <form onSubmit={handleDelete}>
//           <CardContent className="space-y-4">
//             {error && (
//               <Alert variant="destructive">
//                 <AlertTriangle className="h-4 w-4" />
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             <div className="space-y-2">
//               <Label htmlFor="password">Mot de passe</Label>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Saisissez votre mot de passe"
//                   className="pr-10"
//                   disabled={isLoading}
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                   onClick={() => setShowPassword(!showPassword)}
//                   disabled={isLoading}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4 text-slate-400" />
//                   ) : (
//                     <Eye className="h-4 w-4 text-slate-400" />
//                   )}
//                 </Button>
//               </div>
//             </div>

//             <Alert>
//               <AlertTriangle className="h-4 w-4" />
//               <AlertDescription>
//                 <strong>Attention :</strong> Cette action supprimera
//                 définitivement votre compte et toutes vos données.
//               </AlertDescription>
//             </Alert>
//           </CardContent>

//           <CardFooter className="flex gap-3">
//             <Button
//               type="button"
//               variant="outline"
//               className="flex-1"
//               disabled={isLoading}
//               onClick={() => {
//                navigat(-1)
//               }}
//             >
//               Annuler
//             </Button>
//             <Button
//               type="submit"
//               variant="destructive"
//               className="flex-1"
//               disabled={isLoading || !password.trim()}
//             >
//               {isLoading ? (
//                 <>
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
//                   Suppression...
//                 </>
//               ) : (
//                 <>
//                   <Trash2 className="w-4 h-4 mr-2" />
//                   Supprimer
//                 </>
//               )}
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   );
// }

// export default DropCompt;



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
      setError("Please enter your password to confirm deletion");
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
        throw new Error(data.message || "Failed to delete account");
      }
      setSuccess(true);
      setPassword("");
      
      // Show success toast
      toast.success("Account deleted successfully", {
        description: "Your account and all associated data have been removed",
        duration: 3000,
      });
      
      // Redirect to home page after delay
      setTimeout(() => {
        dispatch(logout());
      }, 2000);
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
      console.error("Account deletion error:", error);
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
              Account Deleted
            </CardTitle>
            <CardDescription className="text-gray-600">
              Your account has been successfully deleted.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              You will be redirected to the home page shortly...
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
            Delete Account
          </CardTitle>
          <CardDescription className="text-gray-600">
            This action cannot be undone. All your data will be permanently
            removed.
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
              <Label htmlFor="password">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password to confirm"
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
                <strong>Warning:</strong> This will permanently delete your
                account and all associated data. This action cannot be reversed.
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
              Cancel
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
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
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