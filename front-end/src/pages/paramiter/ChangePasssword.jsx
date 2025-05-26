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
// import {
//   Eye,
//   EyeOff,
//   Key,
//   CheckCircle,
//   XCircle,
//   AlertTriangle,
// } from "lucide-react";
// import { Navigate, useNavigate } from "react-router-dom";

// function ChangePassword() {
//   const [formData, setFormData] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [showPasswords, setShowPasswords] = useState({
//     old: false,
//     new: false,
//     confirm: false,
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   // Pattern de validation : au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
//   const passwordPattern =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@$%&((*&^^@>])/;
//   const minLength = 8;
//     const navigate = useNavigate();

//   const validatePassword = (password) => {
//     const validations = {
//       length: password.length >= minLength,
//       lowercase: /[a-z]/.test(password),
//       uppercase: /[A-Z]/.test(password),
//       number: /\d/.test(password),
//         special: /[!@$%&((*&^^@>]/.test(password),
//     };
//     return validations;
// };

//   const isPasswordValid = (password) => {
//     const validations = validatePassword(password);
//     return Object.values(validations).every(Boolean);
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     setError("");
//   };

//   const togglePasswordVisibility = (field) => {
//     setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validations côté client
//     if (!formData.oldPassword.trim()) {
//       setError("Veuillez saisir votre ancien mot de passe");
//       return;
//     }

//     if (!isPasswordValid(formData.newPassword)) {
//       setError("Le nouveau mot de passe ne respecte pas les critères requis");
//       return;
//     }

//     if (formData.newPassword !== formData.confirmPassword) {
//       setError("Les mots de passe ne correspondent pas");
//       return;
//     }

//     if (formData.oldPassword === formData.newPassword) {
//       setError("Le nouveau mot de passe doit être différent de l'ancien");
//       return;
//     }

//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await fetch("/api/change-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           oldPassword: formData.oldPassword,
//           newPassword: formData.newPassword,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         if (response.status === 401) {
//           setError("Ancien mot de passe incorrect");
//         } else {
//           setError(data.message || "Une erreur est survenue");
//         }
//         return;
//       }

//       setSuccess(true);
//       setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });

//       setTimeout(() => {
//         setSuccess(false);
//       }, 3000);
//     } catch (error) {
//       setError("Erreur de connexion au serveur");
//       console.error("Erreur:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const validations = validatePassword(formData.newPassword);
//   const passwordsMatch =
//     formData.newPassword &&
//     formData.confirmPassword &&
//     formData.newPassword === formData.confirmPassword;

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Key className="w-8 h-8 text-blue-600" />
//           </div>
//           <CardTitle className="text-xl font-bold text-slate-900">
//             Changer le mot de passe
//           </CardTitle>
//           <CardDescription className="text-slate-600">
//             Saisissez votre ancien mot de passe et définissez un nouveau mot de
//             passe sécurisé
//           </CardDescription>
//         </CardHeader>

//         <form onSubmit={handleSubmit}>
//           <CardContent className="space-y-4">
//             {error && (
//               <Alert variant="destructive">
//                 <AlertTriangle className="h-4 w-4" />
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             {success && (
//               <Alert className="border-green-200 bg-green-50">
//                 <CheckCircle className="h-4 w-4 text-green-600" />
//                 <AlertDescription className="text-green-800">
//                   Mot de passe modifié avec succès !
//                 </AlertDescription>
//               </Alert>
//             )}

//             {/* Ancien mot de passe */}
//             <div className="space-y-2">
//               <Label htmlFor="oldPassword">Ancien mot de passe</Label>
//               <div className="relative">
//                 <Input
//                   id="oldPassword"
//                   type={showPasswords.old ? "text" : "password"}
//                   value={formData.oldPassword}
//                   onChange={(e) =>
//                     handleInputChange("oldPassword", e.target.value)
//                   }
//                   placeholder="Saisissez votre ancien mot de passe"
//                   className="pr-10"
//                   disabled={isLoading}
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                   onClick={() => togglePasswordVisibility("old")}
//                   disabled={isLoading}
//                 >
//                   {showPasswords.old ? (
//                     <EyeOff className="h-4 w-4 text-slate-400" />
//                   ) : (
//                     <Eye className="h-4 w-4 text-slate-400" />
//                   )}
//                 </Button>
//               </div>
//             </div>

//             {/* Nouveau mot de passe */}
//             <div className="space-y-2">
//               <Label htmlFor="newPassword">Nouveau mot de passe</Label>
//               <div className="relative">
//                 <Input
//                   id="newPassword"
//                   type={showPasswords.new ? "text" : "password"}
//                   value={formData.newPassword}
//                   onChange={(e) =>
//                     handleInputChange("newPassword", e.target.value)
//                   }
//                   placeholder="Saisissez votre nouveau mot de passe"
//                   className="pr-10"
//                   disabled={isLoading}
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                   onClick={() => togglePasswordVisibility("new")}
//                   disabled={isLoading}
//                 >
//                   {showPasswords.new ? (
//                     <EyeOff className="h-4 w-4 text-slate-400" />
//                   ) : (
//                     <Eye className="h-4 w-4 text-slate-400" />
//                   )}
//                 </Button>
//               </div>

//               {/* Critères de validation */}
//               {formData.newPassword && (
//                 <div className="space-y-1 text-sm">
//                   <div
//                     className={`flex items-center gap-2 ${
//                       validations.length ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {validations.length ? (
//                       <CheckCircle className="h-3 w-3" />
//                     ) : (
//                       <XCircle className="h-3 w-3" />
//                     )}
//                     <span>Au moins 8 caractères</span>
//                   </div>
//                   <div
//                     className={`flex items-center gap-2 ${
//                       validations.lowercase ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {validations.lowercase ? (
//                       <CheckCircle className="h-3 w-3" />
//                     ) : (
//                       <XCircle className="h-3 w-3" />
//                     )}
//                     <span>Une lettre minuscule (a-z)</span>
//                   </div>
//                   <div
//                     className={`flex items-center gap-2 ${
//                       validations.uppercase ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {validations.uppercase ? (
//                       <CheckCircle className="h-3 w-3" />
//                     ) : (
//                       <XCircle className="h-3 w-3" />
//                     )}
//                     <span>Une lettre majuscule (A-Z)</span>
//                   </div>
//                   <div
//                     className={`flex items-center gap-2 ${
//                       validations.number ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {validations.number ? (
//                       <CheckCircle className="h-3 w-3" />
//                     ) : (
//                       <XCircle className="h-3 w-3" />
//                     )}
//                     <span>Un chiffre (0-9)</span>
//                   </div>
//                   <div
//                     className={`flex items-center gap-2 ${
//                       validations.special ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {validations.special ? (
//                       <CheckCircle className="h-3 w-3" />
//                     ) : (
//                       <XCircle className="h-3 w-3" />
//                     )}
//                     <span>Un caractère spécial (!@$%&((*&^^@{">"})</span>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Confirmation mot de passe */}
//             <div className="space-y-2">
//               <Label htmlFor="confirmPassword">
//                 Confirmer le nouveau mot de passe
//               </Label>
//               <div className="relative">
//                 <Input
//                   id="confirmPassword"
//                   type={showPasswords.confirm ? "text" : "password"}
//                   value={formData.confirmPassword}
//                   onChange={(e) =>
//                     handleInputChange("confirmPassword", e.target.value)
//                   }
//                   placeholder="Confirmez votre nouveau mot de passe"
//                   className="pr-10"
//                   disabled={isLoading}
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                   onClick={() => togglePasswordVisibility("confirm")}
//                   disabled={isLoading}
//                 >
//                   {showPasswords.confirm ? (
//                     <EyeOff className="h-4 w-4 text-slate-400" />
//                   ) : (
//                     <Eye className="h-4 w-4 text-slate-400" />
//                   )}
//                 </Button>
//               </div>

//               {/* Vérification correspondance */}
//               {formData.confirmPassword && (
//                 <div
//                   className={`flex items-center gap-2 text-sm ${
//                     passwordsMatch ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {passwordsMatch ? (
//                     <CheckCircle className="h-3 w-3" />
//                   ) : (
//                     <XCircle className="h-3 w-3" />
//                   )}
//                   <span>
//                     {passwordsMatch
//                       ? "Les mots de passe correspondent"
//                       : "Les mots de passe ne correspondent pas"}
//                   </span>
//                 </div>
//               )}
//             </div>
//           </CardContent>

//           <CardFooter className="flex gap-3">
//             <Button
//               type="button"
//               variant="outline"
//               className="flex-1"
//               disabled={isLoading}
//               onClick={() => {
//                 navigate("/les paramiter");
//               }}
//             >
//               Annuler
//             </Button>
//             <Button
//               type="submit"
//               className="flex-1"
//               disabled={
//                 isLoading ||
//                 !formData.oldPassword.trim() ||
//                 !isPasswordValid(formData.newPassword) ||
//                 !passwordsMatch
//               }
//             >
//               {isLoading ? (
//                 <>
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
//                   Modification...
//                 </>
//               ) : (
//                 <>
//                   <Key className="w-4 h-4 mr-2" />
//                   Modifier
//                 </>
//               )}
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   );
// }

// export default ChangePassword;



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
import {
  Eye,
  EyeOff,
  Key,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ChangePassword() {
  const state = useSelector(state=>state)
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const token = useSelector((state) => state.auth.access_token);
  const navigate = useNavigate();

  // Password validation pattern
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  const minLength = 8;

  const validatePassword = (password) => {
    return {
      length: password.length >= minLength,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*]/.test(password),
      valid: passwordPattern.test(password),
    };
  };

  const isPasswordValid = (password) => {
    return passwordPattern.test(password);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validations
    if (!formData.oldPassword.trim()) {
      setError("Please enter your current password");
      return;
    }

    if (!isPasswordValid(formData.newPassword)) {
      setError("New password doesn't meet the requirements");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (formData.oldPassword === formData.newPassword) {
      setError("New password must be different from current password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/settings/change-password/${state.auth.user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: formData.oldPassword,
          new_password: formData.newPassword,
          new_password_confirmation: formData.confirmPassword,
        }),
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      } else {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/les paramiter"); // Redirect after success
        }, 2000);
      }

      // setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });

    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validations = validatePassword(formData.newPassword);
  const passwordsMatch = formData.newPassword === formData.confirmPassword;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Key className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Change Password
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter your current password and set a new secure password
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Password changed successfully!
                </AlertDescription>
              </Alert>
            )}

            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.old ? "text" : "password"}
                  value={formData.oldPassword}
                  onChange={(e) =>
                    handleInputChange("oldPassword", e.target.value)
                  }
                  placeholder="Enter current password"
                  className="pr-10"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility("old")}
                  disabled={isLoading}
                >
                  {showPasswords.old ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) =>
                    handleInputChange("newPassword", e.target.value)
                  }
                  placeholder="Enter new password"
                  className="pr-10"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility("new")}
                  disabled={isLoading}
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>

              {/* Password Requirements */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div
                  className={`flex items-center gap-2 ${
                    validations.length ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {validations.length ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  <span>8+ characters</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    validations.lowercase ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {validations.lowercase ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  <span>Lowercase letter</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    validations.uppercase ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {validations.uppercase ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  <span>Uppercase letter</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    validations.number ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {validations.number ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  <span>Number</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    validations.special ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {validations.special ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  <span>Special character</span>
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  placeholder="Confirm new password"
                  className="pr-10"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility("confirm")}
                  disabled={isLoading}
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>

              {formData.confirmPassword && (
                <div
                  className={`flex items-center gap-2 text-sm ${
                    passwordsMatch ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {passwordsMatch ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  <span>
                    {passwordsMatch
                      ? "Passwords match"
                      : "Passwords don't match"}
                  </span>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              disabled={isLoading}
              onClick={() => navigate("/les paramiter")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={
                isLoading ||
                !formData.oldPassword ||
                !isPasswordValid(formData.newPassword) ||
                !passwordsMatch
              }
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Changing...
                </>
              ) : (
                "Change Password"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default ChangePassword;