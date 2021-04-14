import React, { useState } from "react";
import FormSelect from "./../../Components/forms/FormSelect";
import { useDispatch } from "react-redux";
import FormInput from "./../../Components/forms/FormInput/";
import { addProductStart } from "./../../redux/Products/products.actions";

const Admin = (props) => {
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
    reset();
  };

  const reset = () => {
    setProductCategory("mens");
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
  };
  return (
    <React.Fragment>
      <div
        className="bg-white p-5 rounded-2xl shadow-lg"
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
    </React.Fragment>
  );
};

export default Admin;
