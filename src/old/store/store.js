import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/user.reducer";
import { authReducer } from "./reducers/auth.reducer";
import { isBrowser } from "@/utils/is-browser";

const rootReducer = combineReducers({
  userModule: userReducer,
  authModule: authReducer,
});

const composeEnhancers =
  (isBrowser() && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
