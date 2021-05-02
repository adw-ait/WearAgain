import React from "react";

function Orders() {
  return (
    <React.Fragment>
      <div className="orderHeader text-2xl font-semibold">Orders</div>
      <div className="orderList flex flex-col w-full h-full gap-2">
        <div
          className="order w-full h-full border-gray-300 border-2 flex justify-between items-center px-5 text-lg "
          style={{ maxHeight: "15vh" }}
        >
          <span className="text-xl">Order No.</span>
          <span>Order Date</span>
          <span>image</span>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Orders;
