import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { authApi } from "@/lib/api";

/**
 * Async Thunks for Sanctum Cookie-based Authentication
 * No more localStorage - the HttpOnly cookie handles session persistence
 */

// Fetch current user - validates if session cookie is still valid
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await authApi.getUser();
      return user;
    } catch (error) {
      // 401 means not authenticated (no valid cookie)
      if (error.response?.status === 401) {
        return rejectWithValue("Not authenticated");
      }
      return rejectWithValue(error.message);
    }
  }
);

// Login - server sets HttpOnly cookie, we just store user data
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authApi.login(credentials);
      return data; // { user: {...} } - no token needed!
    } catch (error) {
      if (error.response?.data?.errors) {
        return rejectWithValue(error.response.data.errors);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Logout - server clears the HttpOnly cookie
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      return null;
    } catch (error) {
      // Even if logout fails, clear local state
      return null;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isAuthenticated: false,
    isLoading: true, // Start true - we need to check cookie on mount
    error: null,
    path: null,
  },
  reducers: {
    setPath: (state, action) => {
      state.path = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload?.id;
    },
    clearAuth: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      state.error = null;
    },
    // Legacy action for backwards compatibility during migration
    logout: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      state.error = null;
      // NO MORE localStorage.removeItem - cookie is HttpOnly!
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUser (session validation on app mount)
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = {};
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null; // Not an error - just not logged in
      })
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {};
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

// Export actions and reducer
export const { setIsLoading, setUser, logout, setPath, clearAuth } =
  authSlice.actions;

// REMOVED: setToken - no longer needed with HttpOnly cookies!
// REMOVED: access_token from state - cookie handles this now

export default authSlice.reducer;
