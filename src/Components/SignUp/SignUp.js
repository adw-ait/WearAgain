import React, { useState } from "react";
import Button from "../forms/Button";
import google from "./../../images/Signup_login/google.svg";
import {
  auth,
  handleUserProfile,
  signInWithGoogle,
} from "./../../firebase/utils";
import FormInput from "../forms/FormInput";

const SignUp = (props) => {
  const [displayName, setdisplayName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errors, seterrors] = useState([]);

  const reset = () => {
    setdisplayName("");
    setemail("");
    setpassword("");
    setconfirmPassword("");
    seterrors([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      const err = [`Password Don't match`];
      seterrors(err);
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });
      reset();
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="flex w-full justify-center font-mono">
      <div className="flex bg-white  rounded-2xl shadow-lg 2xl:signup-desktop lg:signup-laptop">
        <div className="flex flex-col px-10 py-5 items-center w-full gap-5">
          <span className="text-3xl font-semibold ">Create Account</span>
          <div className="flex  border border-gray-300 p-1.5 rounded-md cursor-pointer">
            <img src={google} className="object-contain h-6 w-6 mr-2" alt="" />
            <form onSubmit={handleSubmit}>
              <Button
                styles={"font-semibold focus:outline-none"}
                onClick={signInWithGoogle}
              >
                Continue with Google
              </Button>
            </form>
          </div>
          <div className="divider">------------ OR ------------</div>
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col w-full gap-5"
          >
            <FormInput
              type="text"
              name="displayName"
              value={displayName}
              autoComplete="off"
              placeholder="Full name"
              handleChange={(e) => setdisplayName(e.target.value)}
            />
            <FormInput
              type="email"
              name="email"
              value={email}
              autoComplete="off"
              placeholder="E-mail"
              handleChange={(e) => setemail(e.target.value)}
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              autoComplete="off"
              placeholder="Password"
              handleChange={(e) => setpassword(e.target.value)}
            />
            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              autoComplete="off"
              placeholder="Confirm Password"
              handleChange={(e) => setconfirmPassword(e.target.value)}
            />

            <Button styles="p-1.5 rounded-lg text-white bg-purple-600 text-lg font-semibold hover:bg-purple-700">
              SignUp
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
