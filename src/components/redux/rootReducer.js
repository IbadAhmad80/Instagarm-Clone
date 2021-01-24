import { combineReducers } from "redux";
import { accountReducer, followerReducer } from "./reducers";
export const rootReducer = combineReducers({
  account: accountReducer,
  follower: followerReducer,
});
// This would produce the following state object
