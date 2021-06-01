import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Address from "../../Components/UserProfileComponents/Address/Address";
import Orders from "../../Components/UserProfileComponents/Orders/Orders";
import { listStyles, formInputs } from "./style";
import { addNewAddressStart } from "./../../redux/Address/address.actions";
import { getOrderDetailsStart } from "../../redux/Orders/orders.actions";
export const ModalContext = React.createContext();

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

function UserProfile() {
  const [showAddressModal, setshowAddressModal] = useState(false);
  const [whichContent, setwhichContent] = useState("orders");
  const [modalTitle, setmodalTitle] = useState("");
  const [userName, setuserName] = useState("");
  const [userNumber, setuserNumber] = useState("");
  const [userAddress, setuserAddress] = useState("");
  const [showOrderDetails, setshowOrderDetails] = useState(false);
  const [ActiveOrderID, setActiveOrderID] = useState("");

  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);

  const handleShowOrderDetailsModal = () => {
    setshowOrderDetails(!showOrderDetails);
    // setActiveOrderID("");
  };

  const handleOrderDetails = (orderID) => {
    setActiveOrderID(orderID);
    setshowOrderDetails(!showOrderDetails);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNewAddressStart({
        userName,
        userNumber,
        userAddress,
      })
    );
    // reset();
    setshowAddressModal(!showAddressModal);
  };

  const reset = () => {
    setuserName("");
    setuserAddress("");
    setuserNumber("");
  };

  const handleAddressForm = (e) => {
    const action = e.target.name;
    const value = e.target.value;
    switch (action) {
      case "userName":
        return setuserName(value);
      case "userPhone":
        return setuserNumber(value);
      case "userAddress":
        return setuserAddress(value);
      default:
        return null;
    }
  };
  const handleAddressModal = (e) => {
    e.preventDefault();
    const name = e.target.name;
    setshowAddressModal(!showAddressModal);
    setmodalTitle(name);
    reset();
  };

  const handleWhichContent = (e) => {
    const name = e.target.name;
    setwhichContent(name);
  };
  return (
    <ModalContext.Provider
      value={{
        showAddressModal,
        handleAddressModal,
        modalTitle,
        userName,
        userNumber,
        userAddress,
        handleAddressForm,
        handleAddressSubmit,
        handleShowOrderDetailsModal,
        setshowOrderDetails,
        handleOrderDetails,
        ActiveOrderID,
      }}
    >
      <div className="flex w-full h-screen flex-col">
        <div
          className="header flex h-full flex-col justify-center pl-20 gap-2 font-semibold"
          style={{ maxHeight: "23vh" }}
        >
          <div className="name text-4xl">{currentUser.displayName}</div>
          <div className="address text-xl">{currentUser.email}</div>
        </div>
        <div className="flex mainContent  h-full mx-16 my-5 gap-5">
          <ul
            className="navigation w-full flex flex-col text-xl font-semibold"
            style={{ maxWidth: "15vw" }}
          >
            <button
              className={listStyles}
              name="orders"
              onClick={(e) => handleWhichContent(e)}
            >
              Orders
            </button>

            <button
              className={listStyles}
              name="address"
              onClick={(e) => handleWhichContent(e)}
            >
              Addresses
            </button>
          </ul>
          <div
            className="orders w-full  h-full p-7 flex flex-col gap-5 2 2xl:max-w-5xl"
            // style={{ maxHeight: "55vh" }}
          >
            {whichContent === "orders" && <Orders />}
            {whichContent === "address" && <Address />}
          </div>
        </div>
        {showAddressModal && <Modal />}
        {showOrderDetails && <OrderDetailsModal />}
      </div>
    </ModalContext.Provider>
  );
}

export default UserProfile;

const Modal = () => {
  const {
    handleAddressModal,
    modalTitle,
    userName,
    userNumber,
    userAddress,
    handleAddressForm,
    handleAddressSubmit,
  } = useContext(ModalContext);
  return (
    <React.Fragment>
      <div className="flex z-50 fixed justify-center w-full ">
        <form
          onSubmit={handleAddressSubmit}
          className="content bg-white flex flex-col gap-5 p-5 rounded-xl text-xl font-semibold border-4 border-gray-500"
          // style={{ maxHeight: "60vh", maxWidth: "30vw" }}
        >
          <span className="text-2xl">{modalTitle} Address</span>
          <div className="Name flex flex-col">
            <span>Name</span>
            <input
              type="text"
              name="userName"
              className={formInputs}
              value={userName}
              onChange={(e) => handleAddressForm(e)}
            />
          </div>
          <div className="Name flex flex-col">
            <span>Phone Number</span>
            <input
              type="text"
              name="userPhone"
              className={formInputs}
              value={userNumber}
              onChange={(e) => handleAddressForm(e)}
            />
          </div>
          <div className="Name flex flex-col">
            <span>Address</span>
            <textarea
              name="userAddress"
              id=""
              cols="30"
              rows="4"
              className={formInputs}
              value={userAddress}
              onChange={(e) => handleAddressForm(e)}
            ></textarea>
          </div>

          <div className="buttons flex justify-around bg-gray-300 rounded-md py-1.5">
            <button className="font-semibold hover:text-gray-600" type="submit">
              Save
            </button>
            <button
              className="font-semibold hover:text-gray-600"
              onClick={(e) => handleAddressModal(e)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </React.Fragment>
  );
};

const orderMapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails,
});

const OrderDetailsModal = () => {
  const { handleShowOrderDetailsModal, ActiveOrderID } =
    useContext(ModalContext);
  const { orderDetails } = useSelector(orderMapState);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderDetailsStart(ActiveOrderID));
  }, []);

  return (
    <React.Fragment>
      {" "}
      <div className="flex z-50 fixed justify-center w-full ">
        <div
          className="flex flex-col bg-white p-5 rounded-xl"
          style={{ minHeight: "50vh", minWidth: "35vw" }}
        >
          <span className="flex justify-between">
            <span className="text-2xl font-semibold">Order History</span>
            <span
              onClick={() => handleShowOrderDetailsModal()}
              className="text-xl font-semibold cursor-pointer"
            >
              Close[x]
            </span>
          </span>
          <hr className="my-5" />
          <span className="font-semibold text-lg mb-5">
            Order Number : #{ActiveOrderID}
          </span>
          <div className="flex flex-col gap-4">
            {Array.isArray(orderDetails.orderItems) &&
              orderDetails.orderItems.length > 0 &&
              orderDetails.orderItems.map((orderDet, pos) => {
                const {
                  productName,
                  productPrice,
                  productThumbnail,
                  quantity,
                } = orderDet;
                return (
                  <React.Fragment key={pos}>
                    <div className="flex w-full items-center justify-between border border-gray-400 rounded-lg px-5 py-2 text-lg font-medium">
                      <div className="image overflow-hidden rounded-md">
                        <img
                          src={productThumbnail}
                          alt=""
                          className="object-contain "
                          style={{ maxHeight: "8vh" }}
                        />
                      </div>
                      <div className="name">{productName}</div>
                      <div className="price">{productPrice}</div>
                      <div className="price">{quantity}</div>
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </React.Fragment>
  );
};
