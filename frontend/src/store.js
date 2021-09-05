import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  reservationCreateReducer,
  reservationDeleteReducer,
  reservationListReducer,
  reservationUpdateReducer,
} from "./reducers/reservationsReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  reservationList: reservationListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  reservationCreate: reservationCreateReducer,
  reservationDelete: reservationDeleteReducer,
  reservationUpdate: reservationUpdateReducer,
  userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
