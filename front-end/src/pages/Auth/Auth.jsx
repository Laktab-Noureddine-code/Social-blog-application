import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoginPage from "../../components/pages/auth/Login";
import SignUpPage from "../../components/pages/auth/Signup";
// import SignupPage from "../../components/pages/auth/Signup";
// import LoginPage from "../../components/pages/auth/Login";
function Auth() {
  const { type, email } = useParams();
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(
    type === "se-connecter" ? true : false
  );
  const toggleView = (e) => {
    e.preventDefault();
    setIsLoginView(!isLoginView);
    if (isLoginView) {
      navigate("/auth/sinscrire");
    } else {
      navigate("/auth/se-connecter");
    }
  };
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl relative overflow-hidden rounded-lg shadow-xl bg-white">
        <div
          className={`w-full transition-all duration-500 ease-in-out ${
            isLoginView
              ? "opacity-100 visible"
              : "opacity-0 invisible absolute top-0 left-0"
          }`}
        >
          <LoginPage
            toggleView={toggleView}
            isLoginView={isLoginView}
            emailpara={email ? email : ""}
          />
        </div>
        <div
          className={`w-full transition-all duration-500 ease-in-out ${
            !isLoginView
              ? "opacity-100 visible"
              : "opacity-0 invisible absolute top-0 left-0"
          }`}
        >
          <SignUpPage toggleView={toggleView}
            isLoginView={isLoginView}
            emailpara={email ? email : ""}
          />
        </div>
      </div>
    </div>
  );
}

export default Auth;
