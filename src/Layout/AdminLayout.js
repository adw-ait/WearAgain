import React from "react";
import Header from "../Components/Header/Header";
import VerticalNav from "../Components/VerticalNav/VerticalNav";
import ProductList from "./../Components/ProductList/ProductList";
import Admin from "../pages/Admin/Admin";
function AdminLayout(props) {
  return (
    <React.Fragment>
      <Header {...props} />
      <div className="flex">
        <div className=" w-80 ">
          <VerticalNav />
        </div>
        <div className="ml-2 mt-10 ">
          <Admin />
        </div>
        <div className="productList w-full">
          <ProductList />
        </div>
      </div>
    </React.Fragment>
  );
}

export default AdminLayout;
