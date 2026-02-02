import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "@/features/blogs/components/Blog-card";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { setBlogs } from "@/Redux/blogInteractionsSlice";
import api from "@/lib/api";

function PageBlogs() {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchPageBlogs = async () => {
            try {
                setLoading(true);
                if (!isAuthenticated) return;

                const response = await api.get(`/api/blogs/entity/page/${id}`);
                dispatch(setBlogs(response.data));

            } catch (err) {
                console.error("Error fetching blogs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPageBlogs();
    }, [id, isAuthenticated, navigate, dispatch]);

    // Sync with Redux state

    const blogs = useSelector(state => state.blogInteractions.blogs);


    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Published Articles</h2>
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
                <div className="flex justify-center">
                    <Link
                        to={`/blogs/create/page/${id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white md:font-semibold md:py-2 py-1 px-2 md:px-4 rounded-lg flex items-center"
                    >
                        Create Article
                    </Link>
                </div>
                <h2 className="text-2xl font-semibold mb-4">No Articles Found</h2>
                <p className="text-gray-600">This page hasn't published any articles yet.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold">Published Articles</h2>
                <div className="flex justify-center">
                    <Link
                        to={`/blogs/create/page/${id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white md:font-semibold md:py-2 py-1 px-2 md:px-4 rounded-lg flex items-center"
                    >
                        Create Article
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
}

export default PageBlogs;