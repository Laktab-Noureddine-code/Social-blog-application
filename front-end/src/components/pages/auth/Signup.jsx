import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import loginImage from "../../../assets/auth/login-img.jpg";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../../Redux/authSlice";

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
    "Rejoignez-nous dès maintenant et profitez de toutes les fonctionnalités.";

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
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (!response.ok) {
        const serverErrors = responseData.errors;
        if (serverErrors) {
          Object.keys(serverErrors).forEach((field) => {
            const message = Array.isArray(serverErrors[field])
              ? serverErrors[field][0]
              : serverErrors[field];

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

      if (!responseData.errors) {
        window.localStorage.setItem("access_token", responseData.access_token);
        dispatchEvent(setToken(responseData.access_token));
        dispatchEvent(setUser(responseData.user));
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
        className={`w-full transition-all duration-500 ease-in-out ${!isLoginView
            ? "opacity-100 visible"
            : "opacity-0 invisible absolute top-0 left-0"
          }`}
      >
        <div className="flex flex-col md:flex-row">
          {/* Formulaire d'inscription */}
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
                    minLength: {
                      value: 3,
                      message: "Le nom doit contenir au moins 3 caractères",
                    },
                    maxLength: {
                      value: 30,
                      message: "Le nom doit contenir au maximum 30 caractères",
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
                    required: "L'e-mail est requis.",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Adresse e-mail invalide",
                    },
                  })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="exemple@email.com"
                />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
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
                      message:
                        "Le mot de passe doit contenir au moins 8 caractères",
                    },
                  })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Au moins 8 caractères"
                />
                <p className="text-red-500">{errors.password?.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  {...register("password_confirmation", {
                    required: "La confirmation du mot de passe est requise.",
                    validate: (value) =>
                      value === watch("password") ||
                      "Le mot de passe ne correspond pas",
                  })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirmez votre mot de passe"
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
                <button
                  className="w-full flex items-center justify-center gap-2 p-2 border border-gray-300 rounded hover:bg-gray-50"
                  onClick={() => alert("Connexion Google à implémenter")}
                >
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

          {/* Image à droite */}
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
