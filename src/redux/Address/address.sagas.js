import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import {
  handleFetchAddress,
  handleAddAddress,
  handleFetchAddresses,
  handleDeleteAddress,
} from "./address.helpers";

import {
  fetchAddressesStart,
  setAddress,
  setAddresses,
} from "./address.actions";
import { auth } from "../../firebase/utils";
import addressTypes from "./address.types";

export function* addAddress({
  payload: { userName, userNumber, userAddress },
}) {
  try {
    const timestamp = new Date();
    yield handleAddAddress({
      userName,
      userNumber,
      userAddress,
      addressUserUID: auth.currentUser.uid,
      createdDate: timestamp,
    });
    yield put(fetchAddressesStart());
  } catch (error) {
    // console.log(error);
  }
}

export function* onAddAddressStart() {
  yield takeLatest(addressTypes.ADD_NEW_ADDRESS_START, addAddress);
}

export function* fetchAddresses() {
  try {
    const addresses = yield handleFetchAddresses();
    yield put(setAddresses(addresses));
  } catch (error) {
    // console.log(error);
  }
}

export function* onFetchAddressesStart() {
  yield takeLatest(addressTypes.FETCH_ADDRESSES_START, fetchAddresses);
}

export function* deleteAddress({ payload }) {
  try {
    yield handleDeleteAddress(payload);
    yield put(fetchAddressesStart());
  } catch (error) {
    // console.log(error);
  }
}

export function* onDeleteAddressStart() {
  yield takeLatest(addressTypes.DELETE_ADDRESS_START, deleteAddress);
}

export function* fetchAddress({ payload }) {
  try {
    const address = yield handleFetchAddress(payload);
    yield put(setAddress(address));
  } catch (error) {
    // console.log(error);
  }
}

export function* onFetchAddressStart() {
  yield takeLatest(addressTypes.FETCH_ADDRESS_START, fetchAddress);
}

export default function* addressSagas() {
  yield all([
    call(onAddAddressStart),
    call(onFetchAddressesStart),
    call(onDeleteAddressStart),
    call(onFetchAddressStart),
  ]);
}
