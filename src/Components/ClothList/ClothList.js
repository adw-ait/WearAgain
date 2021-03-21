import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HomeContext } from "../../Layout/HomePageLayout";
import { Clothes } from "../../Temp/Clothes";

const ClothList = () => {
  const { currentCategory } = useContext(HomeContext);
  return (
    <div className="bg-white w-full rounded-lg shadow-lg">
      <div className="grid grid-cols-3 gap-5 p-10">
        {Clothes[currentCategory].map((cloth) => {
          return (
            <div
              key={cloth.id}
              className="rounded hover:shadow-lg transform hover:scale-95 duration-300 border border-transparent hover:border-black p-2 cursor-pointer card"
            >
              <div className="rounded-lg overflow-hidden">
                <Link
                  to={{
                    pathname: `/Home/${cloth.id}`,
                    state: {
                      category: currentCategory,
                      url: cloth.url,
                      Title: cloth.Title,
                      price: cloth.price,
                    },
                  }}
                >
                  <img className="w-full" src={cloth.url} alt="" />
                </Link>
                <div className="px-6 py-3">
                  <div className="font-bold text-xl mb-2 flex justify-between">
                    <p>{cloth.Title}</p>
                    <p>₹ {cloth.price}</p>
                  </div>
                </div>
                <div className="flex justify-evenly">
                  <button
                    className="bg-black text-white w-full font-bold text-lg"
                    style={{ padding: "1.5vh" }}
                  >
                    Buy
                  </button>
                  <button
                    className="w-full font-bold text-lg"
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
