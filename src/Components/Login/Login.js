import React, { Component } from "react";
import { auth } from "../../firebase/utils";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import google from "./../../images/Signup_login/google.svg";

const initialState = {
  email: "",
  password: "",
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (error) {
      // console.log(error);
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="flex w-full justify-center font-mono">
        <div className="flex bg-white  rounded-2xl shadow-lg 2xl:signup-desktop lg:signup-laptop">
          <div className="flex flex-col px-10 py-5 items-center w-full gap-5">
            <span className="text-3xl font-semibold ">Login</span>
            <div className="flex block border border-gray-300 p-1.5 rounded-md cursor-pointer">
              <img
                src={google}
                className="object-contain h-6 w-6 mr-2"
                alt=""
              />
              <Button styles={"font-semibold focus:outline-none"}>
                Continue with Google
              </Button>
            </div>
            <div className="divider">------------ OR ------------</div>
            <form
              onSubmit={this.handleSubmit}
              className="flex flex-col w-full gap-5"
            >
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

              <Button styles="p-1.5 rounded-lg text-white bg-purple-600 text-lg font-semibold hover:bg-purple-700">
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
