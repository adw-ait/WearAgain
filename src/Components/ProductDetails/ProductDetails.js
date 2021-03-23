import React from "react";
import { Link } from "react-router-dom";

function ProductDetails({ state }) {
  console.log(state);
  return (
    <div>
      <div className="flex justify-center items-start  p-10">
        <section className="flex flex-col md:flex-row gap-11 py-10 px-5 bg-white rounded-md shadow-lg w-3/4 md:max-w-5xl">
          <div className="text-indigo-500 flex flex-col justify-between rounded-2xl overflow-hidden">
            <img src={state.url} alt="" />
          </div>
          <div className="text-indigo-500">
            <small className="uppercase">{state.category}</small>
            <h3 className="uppercase text-black text-2xl font-medium">
              {state.Title}
            </h3>
            <h3 className="text-2xl font-semibold mb-7">₹{state.price}</h3>
            <small className="text-black">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
              dolor a ducimus. Omnis sint tenetur in, accusantium assumenda
              aspernatur ex, voluptate minus atque nisi inventore iste quo
              corporis consequuntur incidunt.
            </small>
            <div className="flex gap-0.5 mt-4">
              <button className="bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition text-white uppercase px-8 py-3">
                add to cart
              </button>
              <Link
                to={{ pathname: "/Home/ProductDetail/Edit" }}
                className="bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition text-white uppercase px-8 py-3"
              >
                Edit
              </Link>
            </div>
            <div className="mt-5">
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductDetails;