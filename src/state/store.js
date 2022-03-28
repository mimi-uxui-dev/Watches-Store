import thunk from "redux-thunk"
import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers/index";

// the empty objct {} is our default state

const store = createStore(reducers, applyMiddleware(thunk))

export default store