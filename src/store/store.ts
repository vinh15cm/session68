import { createStore } from "redux";
import reducerBooks from "./reducers/listBooks";
const store = createStore(reducerBooks);
export default store;
