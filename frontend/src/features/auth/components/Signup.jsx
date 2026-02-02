import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import loginImage from "../../../assets/auth/login-img.jpg";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Redux/authSlice";
import api, { authApi } from "@/lib/api";

function SignUpPage({ isLoginView, toggleView, emailpara = "" }) {
  const navigate = useNavigate();
  const dispatchEvent = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
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

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const fullText =
    "Join us now and enjoy all the features.";

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index < fullText.length) {
        setText((current) => current + fullText[index]);
        setIndex((current) => current + 1);
      } else {
        setText("");
        setIndex(0);
      }
    }, 30);
    return () => clearTimeout(timeout);
  }, [index]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Get CSRF cookie first
      await authApi.getCsrfCookie();
      
      const response = await api.post("/api/register", data);
      const responseData = response.data;

      // Registration successful - set user (this auto-sets isAuthenticated)
      dispatchEvent(setUser(responseData.user));
      navigate("/feed");
    } catch (error) {
      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        Object.keys(serverErrors).forEach((field) => {
          const message = Array.isArray(serverErrors[field])
            ? serverErrors[field][0]
            : serverErrors[field];

          let translated = message;
          if (message === "The email has already been taken.") {
            translated = "This email is already in use.";
          }

          setError(field, {
            type: "server",
            message: translated,
          });
        });
      }
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        className={`w-full transition-all duration-500 ease-in-out ${!isLoginView
            ? "opacity-100 visible"
            : "opacity-0 invisible absolute top-0 left-0"
          }`}
      >
        <div className="flex flex-col md:flex-row">
          {/* Sign up form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-2">Create an Account ✨</h2>
            <p className="text-gray-600 mb-8 h-6 w-[300px]">{text}</p>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required.",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Name must be at most 30 characters",
                    },
                  })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
                <p className="text-red-500">{errors.name?.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="exemple@email.com"
                />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required.",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                    },
                    minLength: {
                      value: 8,
                      message:
                        "Password must be at least 8 characters",
                    },
                  })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="At least 8 characters"
                />
                <p className="text-red-500">{errors.password?.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...register("password_confirmation", {
                    required: "Password confirmation is required.",
                    validate: (value) =>
                      value === watch("password") ||
                      "Passwords do not match",
                  })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                />
                <p className="text-red-500">
                  {errors.password_confirmation?.message}
                </p>
              </div>

              <button
                type="submit"
                className={`w-full ${!isValid || isLoading ? "bg-gray-700" : "bg-gray-900"
                  } text-white p-2 rounded hover:bg-gray-800 transition-colors`}
                disabled={!isValid || isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center">

              <p className="mt-6 text-sm text-gray-600">
                Already have an account?
                <a
                  href="#"
                  onClick={toggleView}
                  className="text-blue-600 hover:underline pl-2"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>

          {/* Image on the right */}
          <div className="hidden md:block md:w-1/2">
            <img
              src={loginImage}
              alt="Illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

SignUpPage.propTypes = {
  isLoginView: PropTypes.bool.isRequired,
  toggleView: PropTypes.func.isRequired,
  emailpara: PropTypes.string,
};

export default SignUpPage;
