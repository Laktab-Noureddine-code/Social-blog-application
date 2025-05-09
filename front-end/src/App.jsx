import { RouterProvider } from "react-router-dom";
import AppRouter from "./Router/Router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "./Redux/authSlice"; // Import real actions

function App() {
  const dispatch = useDispatch();
  // First: Load token from localStorage and update Redux
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    console.log(storedToken)
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);
  
  const token = useSelector((state) => state.auth.token);
  // Second: When token is available, fetch user
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const response = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Unauthorized:", response.status);
          return;
        }

        const userData = await response.json();
        dispatch(setUser(userData)); // Use action creator
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchData();
  }, [token, dispatch]);

  return <RouterProvider router={AppRouter} />;
}

export default App;
