import { createSlice } from '@reduxjs/toolkit';

const blogInteractionsSlice = createSlice({
    name: 'blogInteractions',
    initialState: {
        blogs: [],
        savedBlogs: [], // Ajout d'un tableau pour stocker les blogs sauvegardés
        loading: false,
        error: null,
        success: null,
    },
    reducers: {
        // Action to set the entire blogs list
        setBlogs: (state, action) => {
            state.blogs = action.payload;
        },
        
        // Action to add a new blog
        addNewBlog: (state, action) => {
            state.blogs.unshift(action.payload);
        },
        
        // Toggle like on a specific blog
        toggleLike: (state, action) => {
            const { blogId, userId } = action.payload;

            // Update in blogs array
            const blog = state.blogs.find(blog => blog.id === blogId);
            if (blog) {
                if (!blog.likes) blog.likes = [];
                const userLikeIndex = blog.likes.findIndex(like => like.user_id === userId);
                if (userLikeIndex !== -1) {
                    blog.likes.splice(userLikeIndex, 1);
                } else {
                    blog.likes.push({
                        user_id: userId,
                        blog_id: blogId,
                        id: Date.now()
                    });
                }
            }

            // Also update in savedBlogs array
            const savedBlog = state.savedBlogs.find(blog => blog.id === blogId);
            if (savedBlog) {
                if (!savedBlog.likes) savedBlog.likes = [];
                const userLikeIndex = savedBlog.likes.findIndex(like => like.user_id === userId);
                if (userLikeIndex !== -1) {
                    savedBlog.likes.splice(userLikeIndex, 1);
                } else {
                    savedBlog.likes.push({
                        user_id: userId,
                        blog_id: blogId,
                        id: Date.now()
                    });
                }
            }
        },
        
        // Add a comment to a specific blog
        addComment: (state, action) => {
            const { blogId, comment } = action.payload;
            const blog = state.blogs.find(blog => blog.id === blogId);
            
            if (blog) {
                if (!blog.comments) {
                    blog.comments = [];
                }
                blog.comments.push(comment);
            }
        },
        
        // Set saved blogs
        setSavedBlogs: (state, action) => {
            state.savedBlogs = action.payload;
        },
        
        // Add a blog to saved blogs
        addSavedBlog: (state, action) => {
            const blog = action.payload;
            if (!state.savedBlogs.some(savedBlog => savedBlog.id === blog.id)) {
                state.savedBlogs.push(blog);
            }
        },
        
        // Remove a blog from saved blogs
        removeSavedBlog: (state, action) => {
            const blogId = action.payload;
            state.savedBlogs = state.savedBlogs.filter(blog => blog.id !== blogId);
        },
        
        // Toggle saved status for a blog
        toggleSavedBlog: (state, action) => {
            const { blogId, isSaved } = action.payload;
            
            // Update the saved status in the blogs array if the blog exists there
            const blog = state.blogs.find(blog => blog.id === blogId);
            if (blog) {
                blog.isSaved = isSaved;
            }
            
            // Update the savedBlogs array
            if (isSaved) {
                // If the blog is now saved and not already in savedBlogs, add it
                if (!state.savedBlogs.some(savedBlog => savedBlog.id === blogId) && blog) {
                    state.savedBlogs.push(blog);
                }
            } else {
                // If the blog is now unsaved, remove it from savedBlogs
                state.savedBlogs = state.savedBlogs.filter(blog => blog.id !== blogId);
            }
        },
        
        // Status management
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
        clearStatus: (state) => {
            state.error = null;
            state.success = null;
        },
        deleteBlog: (state, action) => {
            const blogId = action.payload;

            // Remove from main blogs list
            state.blogs = state.blogs.filter(blog => blog.id !== blogId);

            // Remove from saved blogs list if present
            state.savedBlogs = state.savedBlogs.filter(blog => blog.id !== blogId);
        },
    },
});

export const { 
    setBlogs,
    addNewBlog,
    deleteBlog,
    toggleLike,
    addComment,
    setSavedBlogs,
    addSavedBlog,
    removeSavedBlog,
    toggleSavedBlog,
    setLoading,
    setError,
    setSuccess,
    clearStatus
} = blogInteractionsSlice.actions;

export default blogInteractionsSlice.reducer;