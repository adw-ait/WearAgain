import React from "react";
import profile from "./../../images/Signup_login/profile-user.svg";

const VerticalNav = () => {
  return (
    <React.Fragment>
      <div
        className="flex flex-col items-center font-bold text-xl"
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
export default VerticalNav;
