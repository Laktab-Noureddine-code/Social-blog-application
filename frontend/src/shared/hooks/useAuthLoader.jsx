// hooks/useAuthLoader.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, setIsLoading } from "@/Redux/authSlice";
import { updateUserAbonnes, updateUserFriends } from "@/Redux/AmisSicie";
import { getInvitationsEnvoyees, getInvitationsRecues, SetIsLoadingInvitaion } from "@/Redux/InvitationSlice";
import { getProfileCompletion } from "@/shared/helpers/invitationActions";
import { setShowProfilePrompt } from "@/Redux/ProfileSlice";
import api from "@/lib/api";

export default function useAuthLoader() {
    const dispatch = useDispatch();
    const { user, isAuthenticated, isLoading } = useSelector(state => state.auth);

    // On mount: Check if we have a valid session (HttpOnly cookie)
    useEffect(() => {
        // Fetch user to validate session - cookie is sent automatically
        dispatch(fetchUser())
            .unwrap()
            .then((userData) => {
                // Check if profile needs completion
                if (
                    userData.created_at === userData.updated_at ||
                    getProfileCompletion(userData) < 60
                ) {
                    dispatch(setShowProfilePrompt(true));
                }
            })
            .catch(() => {
                // Not authenticated - that's fine, user will be redirected to login
                dispatch(setIsLoading(false));
            });
    }, [dispatch]);

    // Fetch friends and invitations when authenticated
    useEffect(() => {
        if (!isAuthenticated || !user?.id) return;

        const fetchData = async () => {
            try {
                // Using the new api client with withCredentials
                const response = await api.get(`/api/amis/${user.id}`);
                const userData = response.data;

                dispatch(updateUserFriends(userData.tousAmis));
                dispatch(getInvitationsEnvoyees(userData.utilisateursInvitesParMoi));
                dispatch(getInvitationsRecues(userData.utilisateursQuiMInvitent));
                dispatch(updateUserAbonnes(userData.tousAbonnes));
                dispatch(SetIsLoadingInvitaion(false));
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };

        fetchData();
    }, [isAuthenticated, user?.id, dispatch]);

    // Listen for unauthorized events (401 from api interceptor)
    useEffect(() => {
        const handleUnauthorized = () => {
            dispatch(setIsLoading(false));
            // User will be redirected by ProtectedRouter
        };

        window.addEventListener('auth:unauthorized', handleUnauthorized);
        return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
    }, [dispatch]);
}
