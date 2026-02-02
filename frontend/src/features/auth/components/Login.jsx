
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../../assets/auth/login-img.jpg"
import { useForm } from "react-hook-form";


import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { LuSun } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../Redux/authSlice";

// eslint-disable-next-line react/prop-types
function LoginPage({ isLoginView, toggleView, emailpara }) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const dispatchEvent = useDispatch();
  const Navigare = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: emailpara,
      password: "",
    },
  });

  const [email, setEmail] = useState(emailpara);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError(null);
    
    try {
      // Use the loginUser thunk - handles CSRF cookie automatically
      const result = await dispatchEvent(loginUser(data)).unwrap();
      
      // Success! Cookie is set by server, user data is in Redux
      // NO localStorage.setItem needed - HttpOnly cookie handles session
      Navigare("/feed");
      
    } catch (error) {
      // Handle validation errors from server
      if (typeof error === 'object' && error !== null) {
        Object.keys(error).forEach((field) => {
          const message = Array.isArray(error[field]) ? error[field][0] : error[field];
          setError(field, {
            type: "server",
            message: message,
          });
        });
      } else {
        setServerError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl relative overflow-hidden rounded-lg shadow-xl bg-white">
        {/* Login View */}
        <div
          className={`w-full transition-all duration-500 ease-in-out ${
            isLoginView
              ? "opacity-100 visible"
              : "opacity-0 invisible absolute top-0 left-0"
          }`}
        >
          <div className="flex flex-col md:flex-row">
            {/* Signup Image (left side of login form) */}
            <div className="hidden md:block md:w-1/2">
              <img
                src={loginImage}
                alt="Sign Up Illustration"
                className="w-full h-full object-cover "
              />
            </div>

            {/* Login Form (right side) */}
            <div className="w-full md:w-1/2 p-8">
              <h1 className="text-2xl font-bold mb-1 flex gap-3">
                Welcome Back <LuSun color="#facc15" />
              </h1>

              {/* <p className="text-gray-600 mb-8 h-6 w-[300px]">
               {text}
              </p> */}

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="text"
                    // value={email}
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Example@email.com"
                  />
                  <p className="text-red-500 ">{errors.email?.message}</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium">
                      Password
                    </label>
                    <Link
                      to={`/forgot-password/${email}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    type="password"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    {...register("password", {
                      required: "Password is required.",
                      // pattern: {
                      //   value:
                      //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                      //   message:
                      //     "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.",
                      // },
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="At least 8 characters"
                  />
                  <p className="text-red-500 ">{errors.password?.message}</p>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <input
                      id="remember-me"
                      type="checkbox"
                      {...register("remember")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={`w-full ${
                      !isValid || isLoading ? "bg-gray-700" : "bg-gray-900"
                    } text-white p-2 rounded hover:bg-gray-800 transition-colors`}
                    disabled={!isValid || isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="mt-6 text-sm text-gray-600">
                  {"Don't have an account?"}
                  <a
                    href="#"
                    onClick={toggleView}
                    className="text-blue-600 hover:underline pl-2"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
