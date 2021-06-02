import moment from "moment";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cardStyles, desc } from "./style";

import { getUserOrderHistory } from "./../../../redux/Orders/orders.actions";
import { ModalContext } from "../../../pages/UserProfile/UserProfile";
import { fetchAddressesStart } from "../../../redux/Address/address.actions";

const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data,
});

function Orders() {
  useEffect(() => {
    dispatch(fetchAddressesStart());
  }, []);
  const { handleOrderDetails } = useContext(ModalContext);
  const dispatch = useDispatch();
  const { currentUser, orderHistory } = useSelector(mapState);
  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id));
  }, []);
  return (
    <React.Fragment>
      <div className="orderHeader text-2xl font-semibold">Orders</div>
      <div className="cardContainer grid grid-cols-3 gap-6">
        {Array.isArray(orderHistory) &&
          orderHistory.length > 0 &&
          orderHistory.map((order, pos) => {
            const { documentID, orderCreatedDate, orderTotal, shippingAddrID } =
              order;
            console.log(shippingAddrID);
            return (
              <div
                key={pos}
                className={cardStyles}
                onClick={() => handleOrderDetails(documentID)}
              >
                <span className="ordernumber">
                  <span className={desc}>#{documentID}</span>
                </span>
                <hr
                  className="mt-2 mb-2"
                  style={{ borderTop: ".11em solid gray" }}
                />
                <span className="orderdate">
                  <span className={desc}>Date : </span>

                  {moment(orderCreatedDate.sec).format("DD/MM/YYYY")}
                </span>
                <span className="ordertotal">
                  <span className={desc}>Total : </span>₹{orderTotal}
                </span>
                <div className="deliveryAddress">
                  {shippingAddrID.map((address, index) => {
                    const { userName, userAddress } = address;
                    return (
                      <React.Fragment>
                        <span>
                          <span className={desc}>Delivered to : </span>
                          {userName}
                        </span>
                        <span>
                          {" "}
                          <span className={desc}>Address : </span>
                          {userAddress}
                        </span>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
}

export default Orders;
