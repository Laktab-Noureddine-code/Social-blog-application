import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Alert, AlertDescription } from "@/shared/ui/alert";
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
import api from "@/lib/api";

function ChangePassword() {
  const { user } = useSelector((state) => state.auth);
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
  const navigate = useNavigate();

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

    if (!formData.oldPassword.trim()) {
      setError("Please enter your current password");
      return;
    }

    if (!isPasswordValid(formData.newPassword)) {
      setError(
        "The new password does not meet security requirements"
      );
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.oldPassword === formData.newPassword) {
      setError("The new password must be different from the old one");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await api.patch(
        `/api/settings/change-password/${user.id}`,
        {
          current_password: formData.oldPassword,
          new_password: formData.newPassword,
          new_password_confirmation: formData.confirmPassword,
        }
      );

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/settings");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
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
            Enter your current password and set a new secure
            password
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
                  placeholder="Enter your current password"
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
                  placeholder="Enter a new password"
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
                  <span>8 characters or more</span>
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirm New Password
              </Label>
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
                      : "Passwords do not match"}
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
              onClick={() => navigate("/settings")}
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
