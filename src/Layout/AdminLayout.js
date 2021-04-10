import React, { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import profile from "./../images/Signup_login/profile-user.svg";
import imageSkeleton from "./../images/Signup_login/imageSkeleton.png";
import FormInput from "../Components/forms/FormInput";
import FormSelect from "../Components/forms/FormSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  fetchProductsStart,
} from "../redux/Products/products.actions";
function AdminLayout(props) {
  return (
    <React.Fragment>
      <Header {...props} />
      <div className="flex">
        <VerticalNav />
        <AdminBody />
        <div className="grid grid-cols-4 gap-2 "></div>
      </div>
    </React.Fragment>
  );
}

export default AdminLayout;

const VerticalNav = () => {
  return (
    <React.Fragment>
      <div
        className="flex flex-col border items-center font-bold text-xl"
        style={{ width: "15vw", height: "100vh" }}
      >
        <div className="p-20">
          <img src={profile} alt="" />
        </div>
        <div className="flex flex-col  mt-5 w-full items-center">
          <span className="mb-5">Home</span>
          <span>SignOut</span>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const AdminBody = (props) => {
  const { products } = useSelector(mapState);
  const [productCategory, setProductCategory] = useState("mens");
  const [productName, setProductName] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productPrice, setProductPrice] = useState(0);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const reset = () => {
    setProductCategory("mens");
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
  };
  return (
    <React.Fragment>
      <div className="">
        <div
          className="bg-white p-5 mt-10 ml-10 rounded-2xl shadow-lg"
          style={{ width: "18vw" }}
        >
          <form
            className="flex flex-col text-xl font-semibold gap-3"
            onSubmit={handleSubmit}
          >
            <span className="mb-5 text-2xl">Add New Product</span>
            <span>Category</span>
            <FormSelect
              className="bg-gray-200 p-1.5 rounded-md"
              options={[
                {
                  value: "mens",
                  name: "Mens",
                },
                {
                  value: "womens",
                  name: "Womens",
                },
                {
                  value: "kids",
                  name: "Kids",
                },
              ]}
              handleChange={(e) => setProductCategory(e.target.value)}
            />
            <span>Product Name</span>
            <FormInput
              className="bg-gray-200 p-1.5 rounded-md"
              type="text"
              name=""
              id=""
              value={productName}
              handleChange={(e) => setProductName(e.target.value)}
            />
            <span>Image URL</span>
            <FormInput
              className="bg-gray-200 p-1.5 rounded-md"
              type="url"
              name=""
              id=""
              value={productThumbnail}
              handleChange={(e) => setProductThumbnail(e.target.value)}
            />
            <span>Price</span>
            <FormInput
              className="bg-gray-200 p-1.5 rounded-md"
              type="number"
              name=""
              id=""
              value={productPrice}
              handleChange={(e) => setProductPrice(e.target.value)}
            />
            <button
              type="submit"
              className="self-start mt-5 bg-black text-white p-2 rounded-lg"
            >
              <span className="font-semibold">Submit</span>
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

const ProductList = () => {
  return (
    <React.Fragment>
      <div className="bg-white border" style={{ width: "12vw" }}>
        Hello
      </div>
    </React.Fragment>
  );
};
