import { combineReducers } from "redux";
import cartReducer from "./Cart/cart.reducer";
import productsReducer from "./Products/products.reducer";
import userReducer from "./User/user.reducer";
import addressReducer from "./Address/address.reducer";
export default combineReducers({
  user: userReducer,
  productsData: productsReducer,
  cartData: cartReducer,
  addressData: addressReducer,
});
