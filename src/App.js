import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePageLayout from "./Layout/HomePageLayout";
import LandingPageLayout from "./Layout/LandingPageLayout";
import ProductDetailsLayout from "./Layout/ProductDetailsLayout";
import EditModule from "./EditModule/EditModule";
import RegisterLoginLayout from "./Layout/RegisterLoginLayout";

import { useDispatch } from "react-redux";
import { checkUserSession } from "./redux/User/user.actions";
import UserProfile from "./pages/UserProfile/UserProfile";
import MainLayout from "./Layout/MainLayout";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  });

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
            render={() => <RegisterLoginLayout />}
            exact={true}
          ></Route>
          <Route
            path="/Home/ProductDetail/:id"
            render={() => <ProductDetailsLayout />}
            exact={true}
          ></Route>
          <Route
            path="/Home/ProductDetail/Edit"
            component={EditModule}
            exact={true}
          ></Route>
          <Route
            path="/Home/UserProfile"
            render={() => (
              <MainLayout>
                <UserProfile />
              </MainLayout>
            )}
            exact={true}
          ></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
