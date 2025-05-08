import initialState from "./inistialeState";

const Reducer = (state=initialState,action)=>{
    switch (action.type) {
      case "Update_token": {
        return { ...state, access_token: action.payload, isLoading: false };
      }
      case "Update_user": {
        return { ...state, user: action.payload };
      }
      case "stop_loading": {
        return { ...state, isLoading: false };
      }
      case "upload_posts": {
        return { ...state, posts: action.payload };
      }
      default:
        return state;
    }
}   
export default Reducer;