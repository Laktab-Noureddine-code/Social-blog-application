import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSavedBlogs, setLoading } from "../Redux/blogInteractionsSlice";

export default function useSavedBlogs() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.access_token);
    const userId = useSelector(state => state.auth.user?.id);

    useEffect(() => {
        // Ne pas exécuter si l'utilisateur n'est pas connecté
        if (!token || !userId) return;

        // Définir l'état de chargement à true
        dispatch(setLoading(true));

        // Faire la requête pour récupérer les blogs sauvegardés
        axios.get('/api/saved-blogs', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // Dispatcher les blogs sauvegardés dans le state Redux
                dispatch(setSavedBlogs(res.data));
                dispatch(setLoading(false));
            })
            .catch(error => {
                console.error('Error fetching saved blogs:', error);
                dispatch(setLoading(false));
            });
    }, [dispatch, token, userId]); // Dépendances du useEffect
}