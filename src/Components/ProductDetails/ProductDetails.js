import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  fetchImageStart,
  setEditImage,
} from "../../redux/EditImage/editImage.actions";

import {
  fetchProductStart,
  setProduct,
} from "../../redux/Products/products.actions";
import { addProduct } from "./../../redux/Cart/cart.actions";
const mapState = (state) => ({
  product: state.productsData.product,
});

const editImageMapState = ({ editImageData }) => ({
  image: editImageData.image,
});

export const ProductDetailContext = React.createContext();

function ProductDetails() {
  const { productID } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector(mapState);
  const { image } = useSelector(editImageMapState);
  const [newImageLink, setnewImageLink] = useState("");

  const { productThumbnail, productName, productPrice, productCategory } =
    product;

  useEffect(() => {
    dispatch(fetchImageStart(productID));

    // return () => dispatch(setEditImage({}));
  }, []);

  useEffect(() => {
    dispatch(fetchProductStart(productID));
    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const handleNewImage = (link) => {
    setnewImageLink(link);
  };

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
  };
  console.log(image.length);

  return (
    <ProductDetailContext.Provider
      value={{
        handleNewImage,
      }}
    >
      <div>
        <div className="flex justify-center items-start  p-10">
          <section className="flex flex-col md:flex-row gap-11 py-10 px-5 bg-white rounded-md shadow-lg w-3/4 md:max-w-5xl">
            <div className="text-indigo-500 flex flex-col justify-between rounded-2xl overflow-hidden">
              {image.length ? (
                <img src={image[0].downloadURL} alt="" />
              ) : (
                <img
                  src={productThumbnail}
                  alt=""
                  // style={{ minHeight: "25vh", minWidth: "15vw" }}
                />
              )}
              {/* <img src={productThumbnail} alt="" /> */}

              {/* <img src={productThumbnail} alt="" /> */}
              {/* {newImageLink.length <= 0 ? (
                <img src={productThumbnail} alt="" />
              ) : (
                <img src={newImageLink} alt="" />
              )} */}
            </div>
            <div className="text-indigo-500">
              <small className="uppercase">{productCategory}</small>
              <h3 className="uppercase text-black text-2xl font-medium">
                {productName}
              </h3>
              <h3 className="text-2xl font-semibold mb-7">₹{productPrice}</h3>
              <small className="text-black">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
                dolor a ducimus. Omnis sint tenetur in, accusantium assumenda
                aspernatur ex, voluptate minus atque nisi inventore iste quo
                corporis consequuntur incidunt.
              </small>
              <div className="flex gap-0.5 mt-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition text-white uppercase px-8 py-3"
                >
                  add to cart
                </button>
                <Link
                  to={{ pathname: `/product/edit/${productID}` }}
                  className="bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition text-white uppercase px-8 py-3"
                >
                  Edit
                </Link>
              </div>
              {/* <div className="mt-5">
              <small className="uppercase">choose size</small>
              <div className="flex flex-wrap md:flex-nowrap gap-1">
                <div className="grid place-items-center border px-3 py-2 hover:bg-indigo-500 hover:text-white transition">
                  <small>S</small>
                </div>
                <div className="grid place-items-center border px-3 py-2 hover:bg-indigo-500 hover:text-white transition">
                  <small>M</small>
                </div>
                <div className="grid place-items-center border px-3 py-2 hover:bg-indigo-500 hover:text-white transition">
                  <small>L</small>
                </div>
                <div className="grid place-items-center border px-3 py-2 hover:bg-indigo-500 hover:text-white transition">
                  <small>XL</small>
                </div>
              </div>
            </div> */}
            </div>
          </section>
        </div>
      </div>
    </ProductDetailContext.Provider>
  );
}

export default ProductDetails;
