import moment from "moment";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cardStyles, desc } from "./style";

import { getUserOrderHistory } from "./../../../redux/Orders/orders.actions";
import { ModalContext } from "../../../pages/UserProfile/UserProfile";

const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data,
});
function Orders() {
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
            const { documentID, orderCreatedDate, orderTotal } = order;
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
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
}

export default Orders;
