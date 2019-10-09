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

export const authorize = userObj => {
  console.log("TCL: userObj", userObj);
  userData = { username: userObj.username, password: userObj.password };
  // if (userObj.type === "register") userData["email"] = userObj.email;
  console.log("TCL: userData", userData);
  return async dispatch => {
    try {
      const res = await axios.post(
        `http://178.128.114.232/api/${userObj.type}/`,
        userData
      );
      const user = res.data;
      dispatch(setCurrentUser(user.token));
    } catch (err) {
      console.error("ERROR ===================>", err);
    }
  };
};
