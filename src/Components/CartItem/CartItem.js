import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImageStart } from "../../redux/EditImage/editImage.actions";
import {
  removeCartItem,
  addProduct,
  reduceCartItem,
} from "./../../redux/Cart/cart.actions";
const editImageMapState = ({ editImageData }) => ({
  image: editImageData.image,
});

function CartItem({ item, pos }) {
  const dispatch = useDispatch();
  const { productThumbnail, productName, quantity, productPrice, documentID } =
    item;
  console.log(item);
  const { image } = useSelector(editImageMapState);
  useEffect(() => {
    dispatch(fetchImageStart(documentID));

    // return () => dispatch(setEditImage({}));
  }, []);

  const handleRemoveCartItem = (documentID) => {
    dispatch(removeCartItem({ documentID }));
  };

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const handleReduceItem = (product) => {
    dispatch(reduceCartItem(product));
  };

  return (
    <div key={pos} className="cart-content">
      <div className="border-b-2 font-semibold text-xl flex px-10 py-5">
        <div className="image overflow-hidden rounded-xl">
          {image.length && image[0].productID === documentID ? (
            <img
              src={image[0].downloadURL}
              alt=""
              className="object-contain "
              style={{ maxHeight: "35vh" }}
            />
          ) : (
            <img
              src={productThumbnail}
              alt=""
              className="object-contain "
              style={{ maxHeight: "35vh" }}
            />
          )}
          {/* <img
            src={productThumbnail}
            alt=""
            className="object-contain "
            style={{ maxHeight: "35vh" }}
          /> */}
        </div>
        <div className="flex flex-col ml-10 justify-between w-full">
          <div className="description flex justify-between">
            <span>Description : {productName}</span>
            <div className="flex gap-3">
              <button
                onClick={() => handleReduceItem(item)}
                className="hover:shadow-lg px-2 duration-300 transform hover:scale-105"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => handleAddProduct(item)}
                className="hover:shadow-lg px-2 duration-300 transform hover:scale-105"
              >
                +
              </button>
            </div>
          </div>
          <div className="quantity">Quantity : {quantity}</div>

          <button
            onClick={() => handleRemoveCartItem(documentID)}
            className="hover:bg-red-500 duration-500 hover:text-white p-1 rounded-md self-start font-semibold"
          >
            Delete
          </button>

          <span className="self-end">Price : ₹{productPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
