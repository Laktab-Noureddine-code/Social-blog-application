import { useState } from "react";
import {Link} from "react-router-dom";
import { Mail } from "lucide-react";
import { useParams } from "react-router-dom";

function ForgetPassword() {
const { Email } = useParams();
  const [email, setEmail] = useState(Email ? Email : "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Vérifier si l'email est valide
      if (!email.includes("@")) {
        throw new Error("Veuillez entrer une adresse email valide");
      }

      setIsSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Une erreur s'est produite"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        {/* En-tête */}
        <div className="p-6 border-b border-gray-200 bg-black text-white">
          <h2 className="text-2xl font-bold text-center">
            Mot de passe oublié
          </h2>
          <p className="text-center text-gray-300 mt-1">
            Entrez votre adresse email pour recevoir un lien de réinitialisation
          </p>
        </div>

        {/* Contenu */}
        <div className="p-6">
          {isSuccess ? (
            <div className="bg-gray-100 border border-gray-300 rounded-md p-4 mb-4">
              <p className="text-gray-800">
                Si un compte existe avec l'adresse <strong>{email}</strong>,
                vous recevrez un email avec les instructions pour réinitialiser
                votre mot de passe.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    id="email"
                    type="text"
                    placeholder="nom@exemple.fr"
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className={`w-full px-4 py-2 text-white font-medium rounded-md ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Envoi en cours..."
                  : "Envoyer le lien de réinitialisation"}
              </button>
            </form>
          )}
        </div>

        {/* Pied de page */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-center">
          <Link
            to={`/auth/se-connecter/${Email}`}
            className="text-sm text-gray-800 hover:text-black underline underline-offset-4"
          >
            Retour à la page de connexion
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ForgetPassword;