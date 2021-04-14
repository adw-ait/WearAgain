import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  resetPasswordStart,
  resetUserState,
} from "../../redux/User/user.actions";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr,
});

const ForgotPass = (props) => {
  const { resetPasswordSuccess, userErr } = useSelector(mapState);
  const { TriggerForgotPass } = props;
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [errors, seterrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      props.history.push("/Home/SignUp");
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      seterrors(userErr);
    }
  }, [userErr]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
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
