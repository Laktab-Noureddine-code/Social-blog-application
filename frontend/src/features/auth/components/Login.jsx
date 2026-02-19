/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Redux/authSlice";
import AuthLayout from "./AuthLayout";
import { authApi } from "@/lib/api";

function LoginPage() {
  const navigate = useNavigate();
  const dispatchEvent = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError("");

    try {
      const responseData = await authApi.login(data);

      // Dispatch login action to update Redux state
      dispatchEvent(setUser(responseData.user));
      navigate("/feed");
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && (error.response.status === 401 || error.response.status === 422)) {
        setLoginError("These credentials do not match our records.");
      } else {
        setLoginError("An error occurred during login. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Log In" 
      subtitle="Enter your valid credential for logging in"
      welcomeTitle="Welcome Back"
    >
      <form className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
        {loginError && (
          <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center">
            {loginError}
          </div>
        )}

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">
             Email Address
           </label>
           <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 bg-opacity-50"
            placeholder="name@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              }
            })}
             className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 bg-opacity-50"
             placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
           <div className="flex items-center">
             <input
               id="remember-me"
               type="checkbox"
               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
             />
             <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 font-medium">
               Remember your password
             </label>
           </div>
           
             <Link
            to="/forgot-password"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            Forgot Password
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-800">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
