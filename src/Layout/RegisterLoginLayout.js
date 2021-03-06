import React, { useState } from "react";
import ForgotPass from "../Components/ForgotPass/ForgotPass";
import Header from "../Components/Header/Header";
import Login from "../Components/Login/Login";
import SignUp from "../Components/SignUp/SignUp";

function RegisterLoginLayout(props) {
  const [whoIsActive, setwhoIsActive] = useState("login");
  const [ForgotPassword, setForgotPassword] = useState(false);
  const TriggerForgotPass = () => {
    setForgotPassword(!ForgotPassword);
  };
  return (
    <React.Fragment>
      <Header {...props} />

      {!ForgotPassword ? (
        <>
          <div className="flex w-full justify-center mt-5">
            <div className="flex justify-around p-5  2xl:signup-desktop lg:signup-laptop cursor-pointer">
              <span
                className={`text-2xl font-bold hover:text-gray-500 ${
                  whoIsActive === "signup" && "text-purple-600"
                }`}
                onClick={(e) => {
                  setwhoIsActive("signup");
                }}
              >
                Signup
              </span>
              <span className="text-2xl font-bold">|</span>
              <span
                className={`text-2xl font-bold hover:text-gray-500 ${
                  whoIsActive === "login" && "text-purple-600"
                }`}
                onClick={(e) => {
                  setwhoIsActive("login");
                }}
              >
                Login
              </span>
            </div>
          </div>
          {whoIsActive === "signup" ? (
            <SignUp />
          ) : (
            <Login TriggerForgotPass={TriggerForgotPass} />
          )}
        </>
      ) : (
        <ForgotPass TriggerForgotPass={TriggerForgotPass} />
      )}
    </React.Fragment>
  );
}

export default RegisterLoginLayout;
