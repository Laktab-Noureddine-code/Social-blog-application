import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import LoginPage from "../components/Login";
import SignUpPage from "../components/Signup";

function Auth() {
  const { type, email } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine initial view based on route
  const getInitialView = () => {
    const path = location.pathname;
    if (path === "/register" || type === "sinscrire" || type === "s'inscrir") {
      return false; // Show signup
    }
    return true; // Show login by default
  };
  
  const [isLoginView, setIsLoginView] = useState(getInitialView);
  
  // Update view when route changes
  useEffect(() => {
    setIsLoginView(getInitialView());
  }, [location.pathname, type]);
  
  const toggleView = (e) => {
    e.preventDefault();
    setIsLoginView(!isLoginView);
    if (isLoginView) {
      navigate("/register");
    } else {
      navigate("/login");
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
