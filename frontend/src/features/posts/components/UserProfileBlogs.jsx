import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BlogCard from "@/features/blogs/components/Blog-card";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import api from "@/lib/api";

function UserProfileBlogs({ id }) {
    const [localBlogs, setLocalBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const reduxBlogs = useSelector((state) => state.blogInteractions.blogs);
    console.log(reduxBlogs)

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                setLoading(true);
                if (!isAuthenticated) return;

                const response = await api.get(`/api/blogs/user-created/${id}`);
                setLocalBlogs(response.data);
            } catch (err) {
                console.error("Error fetching blogs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserBlogs();
    }, [id, isAuthenticated]);

    // Sync with Redux state
    useEffect(() => {
        if (reduxBlogs.length > 0 && localBlogs.length > 0) {
            const updatedBlogs = localBlogs.map(blog => {
                const updatedBlog = reduxBlogs.find(b => b.id === blog.id);
                return updatedBlog || blog;
            });
            if (JSON.stringify(updatedBlogs) !== JSON.stringify(localBlogs)) {
                setLocalBlogs(updatedBlogs);
            }
        }
    }, [reduxBlogs, localBlogs]);

    if (loading) {
        return (
            <div className="w-full">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold">Published Articles</h2>
                    <div className="">
                        <Link
                            to={`/blogs/create/user/${id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white md:font-semibold md:py-2 py-1 px-2 md:px-4 rounded-lg flex items-center"
                        >
                            Create Article
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
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

    if (localBlogs.length === 0) {
        return (
            <div className="w-full">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold">Published Articles</h2>
                    <div className="">
                        <Link
                            to={`/blogs/create/user/${id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white md:font-semibold md:py-2 py-1 px-2 md:px-4 rounded-lg flex items-center"
                        >
                            Create Article
                        </Link>
                    </div>
                </div>
                <div className="text-center py-5 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">No Articles Found</h2>
                    <p className="text-gray-600">This user hasn't published any articles yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">Published Articles</h2>
                <div className="">
                    <Link
                        to={`/blogs/create/user/${id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white md:font-semibold md:py-2 py-1 px-2 md:px-4 rounded-lg flex items-center"
                    >
                        Create Article
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {localBlogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
}

export default UserProfileBlogs;
