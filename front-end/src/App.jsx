import { RouterProvider } from "react-router-dom";
import AppRouter from "./Router/Router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  
  const state = useSelector((state) => state);
  console.log(state)
  // First: Load token from localStorage and update Redux
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log(token)
    if (token) {
      dispatch({ type: "Update_token", payload: token });
    } else {
      dispatch({ type: "stop_loading" });
    }
  }, [dispatch]);

  // Second: When access_token is available, fetch user
  useEffect(() => {
    const fetchData = async () => {
      if (!state.access_token) return;
      try {
        const response = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${state.access_token}`,
          },
        });

        if (!response.ok) {
          console.error("Unauthorized:", response.status);
          dispatch({ type: "stop_loading" });
          return;
        }

        const userData = await response.json();
        console.log(userData);
        dispatch({ type: "Update_user", payload: userData });
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchData();
  }, [state.access_token, dispatch]);

  return (
    <div>
      {state.isLoading ? (
        <div>loading</div>
      ) : (
        <RouterProvider router={AppRouter} />
      )}
    </div>
  );
}

export default App;
