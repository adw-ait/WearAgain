import React, { useContext } from "react";
import { HomeContext } from "../../Layout/HomePageLayout";

const Slider = () => {
  const { currentCategory } = useContext(HomeContext);
  return (
    <div
      className="Slider w-full rounded-lg overflow-hidden shadow-lg p-3"
      style={{ height: "50vh" }}
    >
      <img
        src={SliderImage[currentCategory]}
        alt=""
        className="object-cover h-full w-full"
      />
    </div>
  );
};

export default Slider;

const SliderImage = {
  Men:
    "https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
  Kids:
    "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  Women:
    "https://images.unsplash.com/photo-1593201562586-c1dc00ec0511?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
};
