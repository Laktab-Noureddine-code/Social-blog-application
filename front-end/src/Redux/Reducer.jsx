import initialState from "./inistialeState";

const Reducer = (state=initialState,action)=>{
    switch (action.type) {
        case "Update_token": {
            return {...state,acces_token:action.payload}
        }
        case "Update_user": {
            return {...state,user:action.payload}
        }
        default:
            return state;
    }
}   
export default Reducer;