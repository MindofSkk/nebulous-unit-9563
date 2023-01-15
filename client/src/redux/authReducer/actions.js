import axios from "axios";
import * as types from "./actionTypes";

export const signupHandler = (data) => (dispatch) => {
  dispatch({ type: types.SIGNUP_LOADING });
  return axios
    .post("https://project-backend-production-62d5.up.railway.app/signup", data)
    .then((r) => {
      console.log(r);
      return dispatch({ type: types.SIGNUP_SUCCESS });
    })
    .catch((err) => {
      console.log(err);
      return dispatch({ type: types.SIGNUP_ERROR });
    });
};

export const loginHandler = (data) => (dispatch) => {
  dispatch({ type: types.LOGIN_LOADING });
  return axios
    .post("https://project-backend-production-62d5.up.railway.app/login", data)
    .then((r) => {
      console.log(r);
      return dispatch({
        type: types.LOGIN_SUCCESS,
        payload: r.data,
      });
    })
    .catch((err) => {
      console.log(err);
      return dispatch({ type: types.LOGIN_ERROR });
    });
};
