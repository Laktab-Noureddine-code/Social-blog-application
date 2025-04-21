import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/landing/Home";
import Auth from "../pages/Auth/Auth";


const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/:type/:email?",
    element: <Auth />,
  },

]);
export default AppRouter;