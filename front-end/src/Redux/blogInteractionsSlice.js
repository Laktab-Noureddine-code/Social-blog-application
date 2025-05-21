import { createSlice } from '@reduxjs/toolkit';

const blogInteractionsSlice = createSlice({
    name: 'blogInteractions',
    initialState: {
        blogs: [],
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
            const blog = state.blogs.find(blog => blog.id === blogId);
            
            if (blog) {
                if (!blog.likes) {
                    blog.likes = [];
                }
                
                const userLikeIndex = blog.likes.findIndex(
                    like => like.user_id === userId
                );
                
                if (userLikeIndex !== -1) {
                    // Remove like if it exists
                    blog.likes.splice(userLikeIndex, 1);
                } else {
                    // Add like if it doesn't exist
                    blog.likes.push({ 
                        user_id: userId,
                        blog_id: blogId,
                        id: Date.now() // Temporary ID until server response
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
    },
});

export const { 
    setBlogs,
    addNewBlog,
    toggleLike,
    addComment,
    setLoading,
    setError,
    setSuccess,
    clearStatus
} = blogInteractionsSlice.actions;

export default blogInteractionsSlice.reducer;