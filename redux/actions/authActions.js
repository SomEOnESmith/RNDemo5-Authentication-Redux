import { AsyncStorage } from "react-native";
import { SET_CURRENT_USER } from "./actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";

const setCurrentUser = token => {
  let user;
  if (token) {
    AsyncStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
    user = jwt_decode(token);
  } else {
    AsyncStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    user = null;
  }

  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

export const login = userData => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://precious-things.herokuapp.com/login/",
        userData
      );
      const user = res.data;
      dispatch(setCurrentUser(user.token));
    } catch (err) {
      console.error(err);
    }
  };
};
