import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAuth = (props) => {
  const { currentUser } = useSelector(mapState);
  useEffect(() => {
    if (!currentUser) {
      props.history.push("/Home/SignUp");
    }
  }, [currentUser]);
  return currentUser;
};

export default useAuth;
