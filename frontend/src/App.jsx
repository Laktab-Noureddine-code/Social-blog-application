import { RouterProvider } from "react-router-dom";
import AppRouter from "./Router/Router";
import { useSelector } from "react-redux";
import useAuthLoader from "@/shared/hooks/useAuthLoader";

function App() {
  // Use the auth loader hook to handle cookie-based session validation
  useAuthLoader();



  return (
    <div className="">
      <RouterProvider router={AppRouter} />
    </div>
  );
}

export default App;
