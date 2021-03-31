import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  emailSignInStart,
  googleSignInStart,
} from "../../redux/User/user.actions";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import google from "./../../images/Signup_login/google.svg";

const mapState = ({ user }) => ({
  currentUser: user.signInSuccess,
});

const Login = (props) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const { TriggerForgotPass } = props;
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      resetForm();
      props.history.push("/");
    }
  }, [currentUser]);

  const resetForm = () => {
    setemail("");
    setpassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };

  return (
    <div className="flex w-full justify-center font-mono">
      <div className="flex bg-white  rounded-2xl shadow-lg 2xl:signup-desktop lg:signup-laptop">
        <div className="flex flex-col px-10 py-5 items-center w-full gap-5">
          <span className="text-3xl font-semibold ">Login</span>
          <div className="flex  border border-gray-300 p-1.5 rounded-md cursor-pointer">
            <img src={google} className="object-contain h-6 w-6 mr-2" alt="" />
            <Button
              onClick={handleGoogleSignIn}
              styles={"font-semibold focus:outline-none"}
            >
              Continue with Google
            </Button>
          </div>
          <div className="divider">------------ OR ------------</div>
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
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

            <Button styles="p-1.5 rounded-lg text-white bg-purple-600 text-lg font-semibold hover:bg-purple-700">
              Login
            </Button>
          </form>
          <div>
            <button onClick={TriggerForgotPass} className="text-lg font-bold">
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
