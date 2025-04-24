import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/landing/Landing";
import Auth from "../pages/Auth/Auth";
import ForgetPassword from "../components/pages/auth/ForgetPassword";


const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
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