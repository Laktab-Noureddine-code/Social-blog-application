
import loginImage from "../../../assets/auth/login-img.jpg"


import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { LuSun } from "react-icons/lu";

// eslint-disable-next-line react/prop-types
export default function LoginPage({ isLoginView, toggleView ,emailpara}) {
  const [email, setEmail] = useState(emailpara);
  const [password, setPassword] = useState("");
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
                className="w-full h-full object-cover"
              />
            </div>

            {/* Login Form (right side) */}
            <div className="w-full md:w-1/2 p-8">
              <h1 className="text-2xl font-bold mb-1 flex gap-3">
                Content de vous revoir <LuSun color="#facc15" />
              </h1>

              <p className="text-gray-600 mb-8">
                C’est votre journée. Connectez-vous pour échanger avec votre
                communauté.
              </p>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Example@email.com"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium">
                      Mot de passe
                    </label>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Mot de passe oublié ?
                    </a>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Au moins 8 caractères"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white p-2 rounded hover:bg-gray-800 transition-colors"
                >
                  Se connecter
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
                    <span>Se connecter avec Google</span>
                  </button>
                </div>

                <p className="mt-6 text-sm text-gray-600">
                  {"Vous n'avez pas de compte ?"}
                  <a
                    href="#"
                    onClick={toggleView}
                    className="text-blue-600 hover:underline pl-2"
                  >
                    Inscrivez-vous
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
