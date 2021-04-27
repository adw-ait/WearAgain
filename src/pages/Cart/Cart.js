import React from "react";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
} from "../../redux/Cart/cart.selectors";
import { useSelector } from "react-redux";
import CartItem from "../../Components/CartItem/CartItem";
const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  totalNumCartItems: selectCartItemsCount,
});
function Cart() {
  const { cartItems, total, totalNumCartItems } = useSelector(mapState);
  console.log(cartItems);
  return (
    <div className="flex w-full p-14 justify-center ">
      {cartItems.length === 0 ? (
        <span className="font-bold text-5xl">Your Cart Is Empty</span>
      ) : (
        <React.Fragment>
          <div className="flex-col w-full mr-10" style={{ maxWidth: "35vw" }}>
            {/* CARD */}
            {cartItems.map((item, pos) => {
              return <CartItem item={item} pos={pos} />;
            })}
          </div>

          {/* Total */}
          <div
            className="orderSummary w-full text-lg font-bold shadow-xl p-5 rounded-xl"
            style={{ maxWidth: "16vw", maxHeight: "32vh" }}
          >
            <div className="card ">
              <div className="mb-5">
                <span className="text-2xl font-bold ">Order Summary</span>
              </div>
              <hr style={{ borderTop: ".12em solid gray" }} />
              <div className="flex flex-col mt-5 gap-3 ">
                <div className="totalItems flex justify-between">
                  <span>Total Items</span>
                  <span>{totalNumCartItems}</span>
                </div>
                <div></div>
                <div className="totalItems flex justify-between">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <hr
                  className="my-5"
                  style={{ borderTop: ".12em solid gray" }}
                />
                <button className="bg-black p-1 rounded-md text-white ">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default Cart;
