import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header/Header";

function LandingPageLayout(props) {
  return (
    <React.Fragment>
      <Header {...props} />
      <div className="flex justify-center items-stretch px-48 py-5 w-full landingPage-images">
        <div className="flex w-full max-h-full">
          {images.map((img) => {
            return (
              <Link
                to={{
                  pathname: `/Home/${img.name}`,
                }}
                key={img.id}
                className="bg-gray-100 rounded-xl w-full m-3 transform  hover:scale-105 duration-500 bg-cover bg-no-repeat bg-center hover:shadow-xl border-4 hover:border-gray-500 cursor-pointer"
                style={{ backgroundImage: `url(${img.url})` }}
              ></Link>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default LandingPageLayout;

const images = [
  { id: 1, name: "mens", url: "./images/landingPageMens.jpg" },
  { id: 2, name: "womens", url: "./images/landingPageWomens.jpg" },
  { id: 3, name: "kids", url: "./images/landingPageKids.jpg" },
];
