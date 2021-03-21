import React from "react";
import { useLocation } from "react-router";
import Header from "../Components/Header/Header";
import ProductDetails from "../Components/ProductDetails/ProductDetails";

function ProductDetailsLayout(props) {
  const { state } = useLocation();
  return (
    <React.Fragment>
      <Header {...props} />
      <ProductDetails state={state} />
    </React.Fragment>
  );
}

export default ProductDetailsLayout;
