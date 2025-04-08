import { createStore, combineReducers } from "redux";
import notesReducer from "./reducers";

const rootReducer = combineReducers({
  notes: notesReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
