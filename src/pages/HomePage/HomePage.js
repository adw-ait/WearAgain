import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import ClothList from "../../Components/ClothList/ClothList";
import FormSelect from "../../Components/forms/FormSelect";
import { fetchProductsStart } from "../../redux/Products/products.actions";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});
function HomePage(props) {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);
  const history = useHistory();
  const { filterType } = useParams();
  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/Home/${nextFilter}`);
  };
  const configFilters = {
    options: [
      {
        name: "Show All",
        value: "",
      },
      {
        name: "Mens",
        value: "mens",
      },
      {
        name: "Womens",
        value: "womens",
      },
      {
        name: "Kids",
        value: "kids",
      },
    ],
    handleChange: handleFilter,
    defaultValue: filterType,
  };
  return (
    <React.Fragment>
      <div className="px-44 py-10">
        <div className="MainContainer flex flex-col  w-full min-h-screen gap-5">
          <FormSelect
            {...configFilters}
            className="bg-gray-200 p-2 rounded-md text-lg font-bold"
          />

          {/* SLIDER */}
          <div
            className="Slider w-full rounded-lg overflow-hidden shadow-lg p-3"
            style={{ height: "50vh" }}
          >
            <img
              src={SliderImage[filterType] || SliderImage.all}
              alt=""
              className="object-cover h-full w-full"
            />
          </div>
          {/* COLLECTION */}
          <div className="flex gap-5">
            {/* FILTER */}
            <div className="bg-white w-1/4 rounded-lg shadow-lg">
              <div className="flex w-full h-full justify-center items-center">
                <p className="font-bold text-5xl">Filters</p>
              </div>
            </div>
            {/* CLOTHLIST */}
            <ClothList products={products} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomePage;

const SliderImage = {
  mens:
    "https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
  kids:
    "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  womens:
    "https://images.unsplash.com/photo-1593201562586-c1dc00ec0511?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",

  all:
    "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80",
};
