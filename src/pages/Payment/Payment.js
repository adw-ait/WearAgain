import React, { useEffect, useState } from "react";
import { cardStyles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddressesStart } from "../../redux/Address/address.actions";
import {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
} from "../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { saveOrderHistory } from "../../redux/Orders/orders.actions";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
const mapState = ({ addressData }) => ({
  addresses: addressData.addresses,
});

const mapStateCartItems = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  totalNumCartItems: selectCartItemsCount,
});
function Payment() {
  const { addresses } = useSelector(mapState);
  const { cartItems, total, totalNumCartItems } =
    useSelector(mapStateCartItems);
  const dispatch = useDispatch();
  const [activeAddress, setactiveAddress] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (totalNumCartItems < 1) {
      history.push({ pathname: "/profile", state: "orders" });
    }
  });
  useEffect(() => {
    dispatch(fetchAddressesStart());
  }, []);

  const handlePlaceOrder = () => {
    const configOrder = {
      orderTotal: total,
      orderItems: cartItems.map((item) => {
        const {
          documentID,
          productName,
          productPrice,
          quantity,
          productThumbnail,
        } = item;
        return {
          documentID,
          productName,
          productPrice,
          quantity,
          productThumbnail,
        };
      }),
      shippingAddrID: addresses.filter((address) => {
        return address.documentID === activeAddress && { ...address };
      }),
    };

    dispatch(saveOrderHistory(configOrder));
  };

  return (
    <div className="flex w-full flex-col p-14">
      <span class="font-semibold text-4xl">Select Address</span>
      <div className="flex w-full mt-10 gap-12">
        <div className="addresses  w-full  max-w-3xl">
          <div className="grid grid-cols-3 gap-6">
            {Array.isArray(addresses) &&
              addresses.length > 0 &&
              addresses.map((address, index) => {
                const { userName, userNumber, userAddress, documentID } =
                  address;
                return (
                  <div key={index} className={cardStyles}>
                    <span className="name">{userName}</span>
                    <span className="phone">{userNumber}</span>
                    <span className="address truncate">{userAddress}</span>
                    <div
                      className={`flex justify-center mt-2 rounded-lg border-2 hover:border-green-500  ${
                        documentID === activeAddress && `bg-gray-400`
                      }`}
                    >
                      <button
                        onClick={() => setactiveAddress(documentID)}
                        className="font-semibold outline-none focus:outline-none"
                      >
                        {documentID === activeAddress ? "Selected" : "Select"}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          {addresses.length <= 0 && (
            <div className="emptyAddress flex flex-col justify-evenly h-full items-center text-2xl font-semibold">
              <span>No Address Added! Please add at least one address</span>
              <Link
                className="text-blue-500"
                to={{
                  pathname: "/profile",
                  state: "address",
                }}
              >
                [+] Add Address
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full max-w-xs p-1">
          <div className="cartSummary w-full p-4 border border-gray-400 rounded-lg">
            <span className="text-2xl font-semibold">Cart Summary</span>
            <div className="cartItems pt-5 flex gap-3 flex-col">
              {cartItems.map((item, index) => {
                const { productName, quantity, productPrice } = item;
                return (
                  <React.Fragment>
                    <div
                      key={index}
                      className="flex justify-between border-2 p-2 rounded-lg font-semibold border-gray-400"
                    >
                      <span>
                        {quantity} X {productName}
                      </span>
                      <span>???{productPrice}</span>
                    </div>
                  </React.Fragment>
                );
              })}
              <div className="flex justify-between p-2 font-semibold">
                <span>Total</span>
                <span>???{total}</span>
              </div>
            </div>
          </div>
          <button
            // disabled={() => {
            //   if (!activeAddress) return false;
            //   return true;
            // }}
            onClick={() => handlePlaceOrder()}
            className={` ${
              !activeAddress
                ? "bg-gray-400"
                : "hover:bg-gray-400 hover:text-white"
            } border border-gray-400 mt-5 flex justify-center rounded-lg p-2  duration-500 font-semibold focus:outline-none`}
          >
            Place Order
          </button>
          {!activeAddress && (
            <div className="flex w-full justify-center  p-2 font-medium text-red-600 text-lg">
              <span>Please Select Address !</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;
