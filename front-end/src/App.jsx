import { RouterProvider } from "react-router-dom";
import AppRouter from "./Router/Router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileCompletion } from "./components/utils/invitationActions";

function App() {
  const dispatch = useDispatch();
  
  const state = useSelector((state) => state);
  // const [hhowProfilePrompt,setShowProfilePrompt] = useState(false)
  // console.log(state)
  // First: Load token from localStorage and update Redux
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    // console.log(token)
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
        // console.log(userData);
        dispatch({ type: "Update_user", payload: userData });
        if (
          userData.created_at === userData.updated_at ||
          getProfileCompletion(userData) < 60
        ) {
          console.log("yeeeeeeeeeeeeeeeeeeeeeeeeeeeeees");
          dispatch({ type: "setShowProfilePrompt", payload: true });
        } else {
          console.log("nooooooooooooooooooooooooooooooooooo");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchData();
  }, [state.access_token, dispatch]);


  useEffect(() => {
    console.log('this is state',state)
    const fetchData = async () => {
      if (!state.access_token || !state.user.id) return;
      try {
        const response = await fetch(`/api/amis/${state.user.id}`, {
          headers: {
            Authorization: `Bearer ${state.access_token}`,
          },
        });

        if (!response.ok) {
          console.error("Unauthorized:", response.status);
          return;
        }

        const userData = await response.json();
        console.log("this is friedns", userData);
        dispatch({ type: "Update_user_friends", payload: userData.tousAmis });
        dispatch({
          type: "get_invitationsEnvoyees",
          payload: userData.utilisateursInvitesParMoi,
        });
        dispatch({
          type: "get_invitationsRecues",
          payload: userData.utilisateursQuiMInvitent,
        });
        // console.log('this is userData',userData)
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchData();
  }, [state.access_token, dispatch, state.user.id]);

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
