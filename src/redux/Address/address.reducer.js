import addressTypes from "./address.types";

const INITIAL_STATE = {
  addresses: [],
  address: {},
};

const addressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case addressTypes.SET_ADDRESSES:
      return {
        ...state,
        addresses: action.payload,
      };

    case addressTypes.SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
};

export default addressReducer;
