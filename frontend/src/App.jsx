import { RouterProvider } from "react-router-dom";
import AppRouter from "./Router/Router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser, setIsLoading } from "./Redux/authSlice"; // Actions Redux Toolkit
import useAuthLoader from "./hooks/useAuthLoader";

function App() {
  // const dispatch = useDispatch();

  // // Load token from localStorage on mount
  // useEffect(() => {
  //   const storedToken = localStorage.getItem("access_token");
  //   if (storedToken) {
  //     dispatch(setToken(storedToken));
  //   }
  // }, [dispatch]);

  // // When token is available, fetch the user
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!state.access_token) {
  //       dispatch(setIsLoading(false));
  //       return;
  //     }

  //     try {
  //       const response = await fetch("/api/user", {
  //         headers: {
  //           Authorization: `Bearer ${state.access_token}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         console.error("Unauthorized:", response.status);
  //         return;
  //       }

  //       const userData = await response.json();
  //       dispatch(setUser(userData));
  //       dispatch(setIsLoading(false));
  //     } catch (err) {
  //       console.error("Error fetching user:", err);
  //     }
  //   };

  //   fetchData();
  // }, [state.access_token, dispatch]);
  useAuthLoader();
  const state = useSelector((state) => state); 


  return (
    <div className="">
      {state.isLoading ? (
        <div>Loading...</div>
      ) : (
        <RouterProvider router={AppRouter} />
      )}
    </div>
  );
}

export default App;
