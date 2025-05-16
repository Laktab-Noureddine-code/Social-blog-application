// hooks/useAuthLoader.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setToken, setUser } from "../Redux/authSlice";
import { updateUserFriends } from "../Redux/AmisSicie";
import { getInvitationsEnvoyees, getInvitationsRecues } from "../Redux/InvitationSlice";
import { getProfileCompletion } from "../components/utils/invitationActions";
import { setShowProfilePrompt } from "../Redux/ProfileSlice";

export default function useAuthLoader() {
    const dispatch = useDispatch();
    const state = useSelector(state=>state)

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            // dispatch(logout());
            dispatch(setIsLoading(false));
            return;
        }
        
        const getUser = async () => {
            const res = await fetch('/api/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();

            if (res.ok) {
                dispatch(setUser(data));
                dispatch(setToken(token));
                dispatch(setIsLoading(false));
                if (
                  data.created_at === data.updated_at ||
                  getProfileCompletion(data) < 60
                ) {
                  dispatch(setShowProfilePrompt(true));
                }
            } 
        };
        getUser();
    }, [dispatch]);
    useEffect(() => {
      const fetchData = async () => {
        if (!state.auth.access_token || !state.auth.user.id) return;
        try {
          const response = await fetch(`/api/amis/${state.auth.user.id}`, {
            headers: {
              Authorization: `Bearer ${state.auth.access_token}`,
            },
          });
          
          if (!response.ok) {
            console.error("Unauthorized:", response.status);
            return;
          }

          const userData = await response.json();
          dispatch(updateUserFriends(userData.tousAmis));
          dispatch(getInvitationsEnvoyees(userData.utilisateursInvitesParMoi));
          dispatch(getInvitationsRecues(userData.utilisateursQuiMInvitent));
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };

      fetchData();
    }, [state.auth.access_token, dispatch, state.auth.user.id]);
}
