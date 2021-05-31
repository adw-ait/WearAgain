import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalContext } from "../../../pages/UserProfile/UserProfile";
import {
  deleteAddressStart,
  fetchAddressesStart,
  setAddresses,
} from "../../../redux/Address/address.actions";
import { cardStyles, buttons, deleteButton } from "./style";

const mapState = ({ addressData }) => ({
  addresses: addressData.addresses,
});

function Address() {
  const { addresses } = useSelector(mapState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAddressesStart());
  }, []);
  const { handleAddressModal } = useContext(ModalContext);
  return (
    <React.Fragment>
      <div className="orderHeader text-2xl font-semibold flex">Addresses</div>
      <button
        className="border-2  border-gray-300 rounded-lg self-start p-1.5 font-semibold text-lg"
        name="Add New"
        onClick={(e) => handleAddressModal(e)}
      >
        + Add New Address
      </button>
      <div className="cardContainer grid grid-cols-3 gap-6">
        {addresses.map((address, index) => {
          const { userName, userNumber, userAddress, documentID } = address;
          return (
            <div key={index} className={cardStyles}>
              <span className="name">{userName}</span>
              <span className="phone">{userNumber}</span>
              <span className="address truncate">{userAddress}</span>
              <div className="buttons self-end flex gap-2">
                {/* <button
                  className={buttons}
                  onClick={(e) => handleAddressModal(e)}
                  name="Edit"
                >
                  Edit
                </button> */}
                <button
                  className={deleteButton}
                  onClick={() => dispatch(deleteAddressStart(documentID))}
                  name="delete"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default Address;
