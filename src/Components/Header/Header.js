import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { signOutUserStart } from "../../redux/User/user.actions";
import { selectCartItemsCount } from "./../../redux/Cart/cart.selectors";
const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
});

function Header(props) {
  const dispatch = useDispatch();

  const { currentUser, totalNumCartItems } = useSelector(mapState);
  const signOut = () => {
    dispatch(signOutUserStart());
  };
  return (
    <nav className="flex p-5 text-black justify-between font-semibold shadow-lg">
      <div className="flex">
        <Link to={{ pathname: "/" }} className=" mr-6 text-xl font-bold">
          Wear Again
        </Link>
        <div className="flex text-lg font-semibold">
          <Link to="/Home/" className="hover:text-gray-600 text-lg">
            Home
          </Link>
        </div>
      </div>
      {currentUser && (
        <div className="flex gap-5 mr-6  text-lg cursor-pointer">
          <Link to="/cart">
            <span className="hover:text-gray-500">Cart</span>
            <span className="inline-flex items-center ml-0.5 justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {totalNumCartItems}
            </span>
          </Link>

          <Link className="hover:text-gray-500" to="/profile">
            Profile
          </Link>
          <span className="hover:text-gray-500" onClick={() => signOut()}>
            LogOut
          </span>
        </div>
      )}
      {!currentUser && (
        <div className="text-lg">
          <Link
            to={{ pathname: "/SignUp" }}
            className="mr-6 hover:text-gray-500"
          >
            Login / SignUp
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Header;
