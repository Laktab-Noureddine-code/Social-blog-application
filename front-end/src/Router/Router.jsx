import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/landing/Home";
import Auth from "../pages/Auth/Auth";
import ForgetPassword from "../components/pages/auth/ForgetPassword";


const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/:type/:email?",
    element: <Auth />,
  },
  {
    path: "/auth/mot-de-pass-oublier/:Email?",
    element: <ForgetPassword />,
  },
]);
export default AppRouter;