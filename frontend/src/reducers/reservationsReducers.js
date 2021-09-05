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

export const reservationListReducer = (state = { reservations: [] }, action) => {
  switch (action.type) {
    case RESERVATIONS_LIST_REQUEST:
      return { loading: true };
    case RESERVATIONS_LIST_SUCCESS:
      return { loading: false, reservations: action.payload };
    case RESERVATIONS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const reservationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RESERVATIONS_CREATE_REQUEST:
      return { loading: true };
    case RESERVATIONS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case RESERVATIONS_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const reservationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case RESERVATIONS_DELETE_REQUEST:
      return { loading: true };
    case RESERVATIONS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case RESERVATIONS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const reservationUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case RESERVATIONS_UPDATE_REQUEST:
      return { loading: true };
    case RESERVATIONS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case RESERVATIONS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
