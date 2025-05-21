import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BlogCard from "../../blogs/Blog-card";
import { Skeleton } from "@mui/material";

function GroupBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { groupeId } = useParams();
    const navigate = useNavigate();
    const { access_token: token } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchGroupBlogs = async () => {
            try {
                setLoading(true);

                // Vérifier si le token existe
                if (!token) {
                    return;
                }

                // Faire la requête avec le token correct en utilisant le nouvel endpoint
                const response = await fetch(`/api/blogs/creator/group/${groupeId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });

                // Gérer les erreurs d'authentification
                if (response.status === 401) {
                    throw new Error("Authentification échouée. Veuillez vous reconnecter.");
                }

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `Le serveur a répondu avec le statut: ${response.status}`);
                }

                const data = await response.json();
                setBlogs(data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur lors de la récupération des blogs:", err);
                setLoading(false);
            }
        };

        fetchGroupBlogs();
    }, [groupeId, token, navigate]);

    // Affichage des squelettes pendant le chargement
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Articles publiés</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <Skeleton variant="rectangular" height={200} />
                            <div className="p-5">
                                <Skeleton variant="text" height={40} width="80%" />
                                <Skeleton variant="text" height={20} width="60%" />
                                <Skeleton variant="text" height={20} width="40%" />
                                <Skeleton variant="rectangular" height={80} />
                                <div className="pt-3 mt-3 border-t border-gray-100">
                                    <div className="flex justify-between">
                                        <Skeleton variant="text" width={100} />
                                        <Skeleton variant="text" width={80} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (blogs.length === 0) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-semibold mb-4">Aucun article trouvé</h2>
                <p className="text-gray-600">Ce groupe n'a pas encore publié d'articles.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold">Articles publiés</h2>
                <div className="">
                    <button
                        onClick={() => navigate(`/blogs/create/group/${groupeId}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white md:font-semibold md:py-2 py-1 px-2 md:px-4 rounded-lg flex items-center"
                    >
                        Créer un article
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog, index) => (
                    <BlogCard key={index} blog={blog} />
                ))}
            </div>
        </div>
    );
}

export default GroupBlogs;