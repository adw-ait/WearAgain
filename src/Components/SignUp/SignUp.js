import React, { useEffect, useState } from "react";
import Button from "../forms/Button";
import google from "./../../images/Signup_login/google.svg";
import { signInWithGoogle } from "./../../firebase/utils";
import FormInput from "../forms/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { signUpUserStart } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

const SignUp = (props) => {
  const { currentUser, userErr } = useSelector(mapState);
  const dispatch = useDispatch();
  const [displayName, setdisplayName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errors, seterrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      reset();
    }
  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      seterrors(userErr);
    }
  }, [userErr]);

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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(
      signUpUserStart({
        displayName,
        email,
        password,
        confirmPassword,
      })
    );
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
