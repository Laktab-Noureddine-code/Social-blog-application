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
import { Trash2, Eye, EyeOff, AlertTriangle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { logoutUser } from "@/Redux/authSlice";
import api from "@/lib/api";

function DropCompt() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      setError(
        "Please enter your password to confirm deletion."
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await api.delete("/api/delete-account", {
        data: { password },
      });

      setSuccess(true);
      setPassword("");

      toast.success("Account deleted successfully", {
        description: "Your account and all your data have been deleted.",
        duration: 3000,
      });

      setTimeout(() => {
        dispatch(logoutUser());
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
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
              Your account has been deleted successfully.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              You will be redirected to the home page...
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
            This action is irreversible. All your data will be permanently
            deleted.
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
              <Label htmlFor="password">Password Confirmation</Label>
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
                <strong>Warning:</strong> This action will permanently
                delete your account and all associated data.
                This operation cannot be undone.
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
