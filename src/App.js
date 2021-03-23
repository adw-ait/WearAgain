import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import HomePageLayout from "./Layout/HomePageLayout";
import LandingPageLayout from "./Layout/LandingPageLayout";
import ProductDetailsLayout from "./Layout/ProductDetailsLayout";
import EditModule from "./EditModule/EditModule";
import RegisterLoginLayout from "./Layout/RegisterLoginLayout";
import { auth, handleUserProfile } from "./firebase/utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/User/user.actions";

const App = (props) => {
  const { setCurrentUser, currentUser } = props;

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });

    return () => authListener();
  }, []);

  return (
    <div className="">
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            render={() => <LandingPageLayout />}
            exact={true}
          ></Route>
          <Route
            path="/Home"
            render={() => <HomePageLayout />}
            exact={true}
          ></Route>
          <Route
            path="/Home/SignUp"
            render={() =>
              currentUser ? <Redirect to="/" /> : <RegisterLoginLayout />
            }
            exact={true}
          ></Route>
          <Route
            path="/Home/:id"
            render={() => <ProductDetailsLayout />}
            exact={true}
          ></Route>
          <Route
            path="/Home/ProductDetail/Edit"
            component={EditModule}
            exact={true}
          ></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchProps)(App);
