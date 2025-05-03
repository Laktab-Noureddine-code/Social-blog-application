import { RouterProvider } from "react-router-dom";
import AppRouter from "./Router/Router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.acces_token);

  // First: Load token from localStorage and update Redux
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      dispatch({ type: "Update_token", payload: token });
    }
  }, [dispatch]);

  // Second: When access_token is available, fetch user
  useEffect(() => {
    const fetchData = async () => {
      if (!access_token) return;

      try {
        const response = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (!response.ok) {
          console.error("Unauthorized:", response.status);
          return;
        }

        const userData = await response.json();
        dispatch({ type: "Update_user", payload: userData });
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchData();
  }, [access_token, dispatch]);

  return (
    <div>
      <RouterProvider router={AppRouter} />
    </div>
  );
}

export default App;
