import React, { useState } from "react";
import { auth } from "../../firebase/utils";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";

const ForgotPass = (props) => {
  const { TriggerForgotPass } = props;
  const [email, setemail] = useState("");
  const [errors, seterrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "http://localhost:3000/",
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          TriggerForgotPass();
        })
        .catch(() => {
          const err = ["Email not found. PLease Try Again"];
          seterrors(err);
        });
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="flex w-full justify-center font-mono mt-10">
      <div className="flex bg-white  rounded-2xl shadow-lg 2xl:signup-desktop lg:signup-laptop">
        <div className="flex flex-col p-5 items-center w-full gap-5">
          <span className="text-2xl font-semibold ">Forgot Password</span>
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
            <FormInput
              type="email"
              name="email"
              value={email}
              autoComplete="off"
              placeholder="E-mail"
              onChange={(e) => setemail(e.target.value)}
            />
            <Button styles="p-1.5 rounded-lg text-white bg-purple-600 text-lg font-semibold hover:bg-purple-700">
              Submit
            </Button>
          </form>

          <button
            onClick={TriggerForgotPass}
            className="font-bold text-lg"
          >{`<< Back to Login`}</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
