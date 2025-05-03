import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import loginImage from "../../../assets/auth/login-img.jpg";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function SignUpPage({ isLoginView, toggleView, emailpara }) {
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
  const fullText =
    "Rejoignez-nous dès maintenant et profitez de toutes les fonctionnalités.";
  const [index, setIndex] = useState(0);

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
  }, [index, fullText]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      console.log(responseData);

      if (!response.ok) {
        const serverErrors = responseData.errors;

        if (serverErrors) {
          Object.keys(serverErrors).forEach((field) => {
            const message = serverErrors[field][0];

            // Traduction simple
            let translated = message;
            if (message === "The email has already been taken.") {
              translated = "Cet email est déjà utilisé.";
            }

            setError(field, {
              type: "server",
              message: translated,
            });
          });
        }
      }
      if (!data.errors) {
        window.localStorage.setItem("access_token", responseData.access_token);
        dispatchEvent({
          type: "Update_token",
          payload: responseData.access_token,
        });
        // dispatchEvent({ type: "Update_user", payload: responseData.user });
        navigate("/accueil");
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div
        className={`w-full transition-all duration-500 ease-in-out ${
          !isLoginView
            ? "opacity-100 visible"
            : "opacity-0 invisible absolute top-0 left-0"
        }`}
      >
        <div className="flex flex-col md:flex-row">
          {/* Signup Form (left side) */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-2">Créer un compte ✨</h2>
            <p className="text-gray-600 mb-8 h-6 w-[300px]">{text}</p>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Le nom est requis.",
                    pattern: {
                      minLength: 3,
                      maxLength: 30,
                      message: "Le nom doit contenir entre 3 et 30 caractères",
                    },
                  })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
                <p className="text-red-500 ">{errors.name?.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "L'e-mail est requis.",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Adresse e-mail invalide",
                    },
                  })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Exemple@email.com"
                />
                <p className="text-red-500 ">{errors.email?.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Mot de passe
                </label>
                <input
                  {...register("password", {
                    required: "Le mot de passe est requis.",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                      message:
                        "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.",
                    },
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Au moins 8 caractères"
                />
                <p className="text-red-500 ">{errors.password?.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirmer le mot de passe
                </label>
                <input
                  {...register("password_confirmation", {
                    required: "Le confirmation du mot de passe est requis.",
                    validate: (value) => {
                      if (value !== watch("password")) {
                        return "Le mot de passe ne correspond pas";
                      }
                      return true;
                    },
                  })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirmez votre mot de passe"
                />
                <p className="text-red-500 ">
                  {errors.password_confirmation?.message}
                </p>
              </div>
              <button
                type="submit"
                className={`w-full ${
                  !isValid || isLoading ? "bg-gray-700" : "bg-gray-900"
                } text-white p-2 rounded hover:bg-gray-800 transition-colors`}
                disabled={!isValid || isLoading}
              >
                {isLoading ? "Création en cours..." : "Créer un compte"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou</span>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <button className="w-full flex items-center justify-center gap-2 p-2 border border-gray-300 rounded hover:bg-gray-50">
                  <FaGoogle className="text-[#4285F4]" />
                  <span>{"S'inscrire avec Google"}</span>
                </button>
              </div>

              <p className="mt-6 text-sm text-gray-600">
                Vous avez déjà un compte ?
                <a
                  href="#"
                  onClick={toggleView}
                  className="text-blue-600 hover:underline pl-2"
                >
                  Connectez-vous
                </a>
              </p>
            </div>
          </div>

          {/* Login Image (right side of signup form) */}
          <div className="hidden md:block md:w-1/2">
            <img
              src={loginImage}
              alt="Social Media Illustration"
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
