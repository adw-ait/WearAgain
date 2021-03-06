import { all, call } from "redux-saga/effects";
import userSagas from "./User/user.sagas";
import productsSagas from "./Products/products.sagas";
import addressSagas from "./Address/address.sagas";
import orderSagas from "./Orders/orders.sagas";
export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(productsSagas),
    call(addressSagas),
    call(orderSagas),
  ]);
}
