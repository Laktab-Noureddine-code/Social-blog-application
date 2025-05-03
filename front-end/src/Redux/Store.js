import { legacy_createStore } from "redux";
import Reducer from "./Reducer";

const Store = legacy_createStore(Reducer);
export default Store;