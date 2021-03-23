import React, { Component } from "react";
import { auth } from "../../firebase/utils";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";

const initialState = {
  email: "",
};

class ForgotPass extends Component {
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email } = this.state;
      const config = {
        url: "http://localhost:3000/",
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          console.log("Password reset");
        })
        .catch(() => {
          console.log("Something went wrong");
        });
    } catch (error) {
      // console.log(error);
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const { email } = this.state;

    return (
      <div className="flex w-full justify-center font-mono mt-10">
        <div className="flex bg-white  rounded-2xl shadow-lg 2xl:signup-desktop lg:signup-laptop">
          <div className="flex flex-col p-5 items-center w-full gap-5">
            <span className="text-2xl font-semibold ">Forgot Password</span>
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
              <Button styles="p-1.5 rounded-lg text-white bg-purple-600 text-lg font-semibold hover:bg-purple-700">
                Submit
              </Button>
            </form>

            <button className="font-bold text-lg">{`<< Back to Login`}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPass;
