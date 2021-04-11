import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductStart,
  fetchProductsStart,
} from "../../redux/Products/products.actions";
const mapState = ({ productsData }) => ({
  products: productsData.products,
});
const ProductList = () => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);
  return (
    <React.Fragment>
      <div className="m-10 grid grid-cols-3 gap-5">
        {products.map((product, index) => {
          const {
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            documentID,
          } = product;
          return (
            <div
              key={index}
              className="bg-white overflow-hidden rounded-xl transform hover:scale-105 duration-500 hover:shadow-lg"
            >
              <div className="flex gap-2">
                <img
                  className="object-fill"
                  style={{ height: "20vh", width: "20vw" }}
                  src={productThumbnail}
                  alt=""
                />
                <div className="flex flex-col pl-5 gap-4 text-lg font-semibold justify-center w-full mr-5">
                  <span>{productCategory}</span>
                  <span>{productName}</span>
                  <span>{productPrice}</span>
                  <span className="self-end">
                    <button
                      className="bg-red-500 text-white font-semibold px-2 py-1 rounded-md"
                      onClick={() => dispatch(deleteProductStart(documentID))}
                    >
                      Delete
                    </button>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default ProductList;
