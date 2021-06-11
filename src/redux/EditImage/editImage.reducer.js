import editImageTypes from "./editImage.types";

const INITIAL_STATE = {
  image: {},
};

const editImageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case editImageTypes.SET_IMAGE:
      return {
        ...state,
        image: action.payload,
      };
    default:
      return state;
  }
};
export default editImageReducer;
