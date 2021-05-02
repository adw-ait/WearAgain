import addressTypes from "./address.types";
// ADDRESS
export const addNewAddressStart = (addressData) => ({
  type: addressTypes.ADD_NEW_ADDRESS_START,
  payload: addressData,
});

export const fetchAddressesStart = () => ({
  type: addressTypes.FETCH_ADDRESSES_START,
});

export const setAddresses = (addresses) => ({
  type: addressTypes.SET_ADDRESSES,
  payload: addresses,
});

export const deleteAddressStart = (addressID) => ({
  type: addressTypes.DELETE_ADDRESS_START,
  payload: addressID,
});

export const fetchAddressStart = (addressID) => ({
  type: addressTypes.FETCH_ADDRESS_START,
  payload: addressID,
});

export const setAddress = (address) => ({
  type: addressTypes.SET_ADDRESS,
  payload: address,
});
