import initialState from "./inistialeState";

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "Update_token": {
      return { ...state, access_token: action.payload, isLoading: false };
    }
    case "Update_user": {
      return { ...state, user: action.payload };
    }
    case "setShowProfilePrompt": {
      return { ...state, showProfilePrompt: action.payload };
    }
    case "stop_loading": {
      return { ...state, isLoading: false };
    }
    case "new_posts": {
      return { ...state, new_posts: false };
    }
    case "upload_posts": {
      return { ...state, posts: action.payload };
    }
    case "add_new_post": {
      return { ...state, posts: [action.payload, ...state.posts] };
    }
    case "Update_user_friends": {
      console.log("Update_user_friends");
      return { ...state, friends: action.payload };
    }
    case "add_new_friends": {
      return { ...state, friends: [action.payload, ...state.friends] };
    }
    case "remove_friend": {
      return {
        ...state,
        friends: state.friends.filter((el) => el.id !== action.payload.id),
      };
    }
    case "get_invitationsEnvoyees": {
      console.log("get_invitationsEnvoyees");
      return { ...state, invitationsEnvoyees: action.payload };
    }
    case "add_new_invitationsEnvoyees": {
      return {
        ...state,
        invitationsEnvoyees: [action.payload, ...state.invitationsEnvoyees],
      };
    }
    case "remove_invitationsEnvoyees": {
      console.log("remove_invitationsEnvoyees", action.payload);
      return {
        ...state,
        invitationsEnvoyees: state.invitationsEnvoyees.filter(
          (el) => el.id !== action.payload.id
        ),
      };
    }
    case "get_invitationsRecues": {
      console.log("get_invitationsRecues");
      return { ...state, invitationsRecues: action.payload };
    }
    case "add_new_invitationsRecues": {
      return {
        ...state,
        invitationsRecues: [action.payload, ...state.invitationsRecues],
      };
    }
    case "remove_invitationsRecues": {
      return {
        ...state,
        invitationsRecues: state.invitationsRecues.filter(
          (el) => el.id !== action.payload.id
        ),
      };
    }
    case "update_likes": {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.idPost
            ? { ...post, likes: action.payload.response }
            : post
        ),
      };
    }
    case "update_comments": {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.idPost
            ? { ...post, comments: action.payload.response }
            : post
        ),
      };
    }
    case "get_medias_profile": {
      return {
        ...state,
        Profile: { ...state.Profile, medias: action.payload },
      };
    }
    case "get_user_profile": {
      return {
        ...state,
        Profile: { ...state.Profile, user: action.payload },
      };
    }
    case "get_user_friends": {
      return {
        ...state,
        Profile: { ...state.Profile, amis: action.payload },
      };
    }

    default:
      return state;
  }
};

export default Reducer;
