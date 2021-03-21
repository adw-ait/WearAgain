import React, { Component } from "react";
import Button from "../forms/Button";
import google from "./../../images/Signup_login/google.svg";
import {
  auth,
  handleUserProfile,
  singnInWithGoogle,
} from "./../../firebase/utils";
import FormInput from "../forms/FormInput";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      const err = [`Password Don't match`];
      this.setState({
        errors: err,
      });
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });
      this.setState({
        ...initialState,
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
      errors,
    } = this.state;
    return (
      <div className="flex w-full justify-center font-mono">
        <div className="flex bg-white  rounded-2xl shadow-lg 2xl:signup-desktop lg:signup-laptop">
          <div className="flex flex-col px-10 py-5 items-center w-full gap-5">
            <span className="text-3xl font-semibold ">Create Account</span>
            <div className="flex block border border-gray-300 p-1.5 rounded-md cursor-pointer">
              <img
                src={google}
                className="object-contain h-6 w-6 mr-2"
                alt=""
              />
              <form onSubmit={this.handleSubmit}>
                <Button
                  styles={"font-semibold focus:outline-none"}
                  onClick={singnInWithGoogle}
                >
                  Continue with Google
                </Button>
              </form>
            </div>
            <div className="divider">------------ OR ------------</div>
            <form
              onSubmit={this.handleFormSubmit}
              className="flex flex-col w-full gap-5"
            >
              <FormInput
                type="text"
                name="displayName"
                value={displayName}
                autoComplete="off"
                placeholder="Full name"
                onChange={this.handleChange}
              />
              <FormInput
                type="email"
                name="email"
                value={email}
                autoComplete="off"
                placeholder="E-mail"
                onChange={this.handleChange}
              />
              <FormInput
                type="password"
                name="password"
                value={password}
                autoComplete="off"
                placeholder="Password"
                onChange={this.handleChange}
              />
              <FormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                autoComplete="off"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />

              <Button styles="p-1.5 rounded-lg text-white bg-purple-600 text-lg font-semibold hover:bg-purple-700">
                SignUp
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
