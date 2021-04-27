import React from "react";
import { listStyles } from "./style";

function UserProfile() {
  return (
    <div className="flex w-full h-screen flex-col">
      <div
        className="header flex h-full flex-col justify-center pl-20 gap-2 font-semibold"
        style={{ maxHeight: "23vh" }}
      >
        <div className="name text-4xl">User Name</div>
        <div className="address text-xl">Address</div>
      </div>
      <div className="flex mainContent  h-full mx-16 my-5 gap-5">
        <ul
          className="navigation w-full flex flex-col text-xl font-semibold"
          style={{ maxWidth: "15vw" }}
        >
          <li className={listStyles}>Orders</li>
          <li className={listStyles}>Profile</li>
          <li className={listStyles}>Addresses</li>
          <li className={listStyles}>Payment</li>
        </ul>
        <div
          className="orders w-full  h-full p-7 flex flex-col gap-5"
          // style={{ maxHeight: "55vh" }}
        >
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
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
