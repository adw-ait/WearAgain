import React from "react";
import { Link } from "react-router-dom";

const ClothList = ({ products }) => {
  if (!Array.isArray(products)) return null;
  if (products.length < 1) {
    return (
      <div className="emptyProducts">
        <span>NO RESULTS FOUND</span>
      </div>
    );
  }
  return (
    <div className="bg-white w-full rounded-lg shadow-lg">
      <div className="grid grid-cols-3 gap-5 p-10">
        {products.map((product, pos) => {
          const {
            documentID,
            productThumbnail,
            productName,
            productPrice,
          } = product;
          if (
            !documentID ||
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          )
            return null;
          return (
            <div
              key={pos}
              className="rounded hover:shadow-lg transform hover:scale-95 duration-300 border border-transparent hover:border-black p-2 cursor-pointer card"
            >
              <div className="rounded-lg overflow-hidden">
                <Link to={`/product/${documentID}`}>
                  <img className="w-full" src={productThumbnail} alt="" />
                </Link>
                <div className="px-6 py-3">
                  <div className="font-bold text-xl mb-2 flex justify-between">
                    <p>{productName}</p>
                    <p>₹ {productPrice}</p>
                  </div>
                </div>
                <div className="flex justify-evenly">
                  <button
                    className="bg-black text-white w-full font-bold text-lg"
                    style={{ padding: "1.5vh" }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClothList;
