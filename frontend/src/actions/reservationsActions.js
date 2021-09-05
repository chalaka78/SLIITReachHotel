import {
  RESERVATIONS_CREATE_FAIL,
  RESERVATIONS_CREATE_REQUEST,
  RESERVATIONS_CREATE_SUCCESS,
  RESERVATIONS_DELETE_FAIL,
  RESERVATIONS_DELETE_REQUEST,
  RESERVATIONS_DELETE_SUCCESS,
  RESERVATIONS_LIST_FAIL,
  RESERVATIONS_LIST_REQUEST,
  RESERVATIONS_LIST_SUCCESS,
  RESERVATIONS_UPDATE_FAIL,
  RESERVATIONS_UPDATE_REQUEST,
  RESERVATIONS_UPDATE_SUCCESS,
} from "../constants/reservationsConstants";
import axios from "axios";

export const listReservations = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESERVATIONS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/reservations`, config);

    dispatch({
      type: RESERVATIONS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: RESERVATIONS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createReservationAction = (title, content, category) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: RESERVATIONS_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/reservations/create`,
      { title, content, category },
      config
    );

    dispatch({
      type: RESERVATIONS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: RESERVATIONS_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deleteReservationAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESERVATIONS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/reservations/${id}`, config);

    dispatch({
      type: RESERVATIONS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: RESERVATIONS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateReservationAction = (id, title, content, category) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: RESERVATIONS_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/reservations/${id}`,
      { title, content, category },
      config
    );

    dispatch({
      type: RESERVATIONS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: RESERVATIONS_UPDATE_FAIL,
      payload: message,
    });
  }
};
