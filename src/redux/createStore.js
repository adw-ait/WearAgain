import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import createSagaMiddle from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddle();
export const middleWares = [sagaMiddleware, logger];

export const store = createStore(rootReducer, applyMiddleware(...middleWares));
sagaMiddleware.run(rootSaga);
export default store;
