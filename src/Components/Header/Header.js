import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { HomeContext } from "../../Layout/HomePageLayout";
import { signOutUserStart } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

function Header(props) {
  const dispatch = useDispatch();
  const { changeCurrentCategory } = useContext(HomeContext);
  const { currentUser } = useSelector(mapState);
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
          <p
            onClick={() => {
              changeCurrentCategory("Men");
            }}
            className="mr-6 hover:text-gray-500 cursor-pointer"
          >
            Men
          </p>
          <p
            onClick={() => {
              changeCurrentCategory("Women");
            }}
            className="mr-6 hover:text-gray-500 cursor-pointer"
          >
            Women
          </p>
          <p
            onClick={() => {
              changeCurrentCategory("Kids");
            }}
            className=" hover:text-gray-500 cursor-pointer"
          >
            Kids
          </p>
        </div>
      </div>
      {currentUser && (
        <div className="mr-6 hover:text-gray-500 text-lg">
          <span onClick={() => signOut()}>LogOut</span>
        </div>
      )}
      {!currentUser && (
        <div className="text-lg">
          <Link
            to={{ pathname: "/Home/SignUp" }}
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
