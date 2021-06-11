import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { auth } from "../../firebase/utils";
import { handleAddEditImage, handleFetchEditImage } from "./editImage.helpers";
import editImageTypes from "./editImage.types";
import { setEditImage } from "./editImage.actions";
export function* addEditImage({ payload: { productID, downloadURL } }) {
  console.log(productID);
  try {
    const timestamp = new Date();
    yield handleAddEditImage({
      productID,
      downloadURL,
      userID: auth.currentUser.uid,
      createdDate: timestamp,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* onAddImageStart() {
  yield takeLatest(editImageTypes.ADD_NEW_EDITIMAGE_START, addEditImage);
}

export function* fetchEditImage({ payload }) {
  try {
    const editImage = yield handleFetchEditImage(payload);
    yield put(setEditImage(editImage));
  } catch (error) {
    // console.log(error);
  }
}

export function* onFetchEditImageStart() {
  yield takeLatest(editImageTypes.FETCH_EDITIMAGE_START, fetchEditImage);
}

export default function* editImageSagas() {
  yield all([call(onAddImageStart), call(onFetchEditImageStart)]);
}
