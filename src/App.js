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
import WithAuth from "./hoc/withAuth";
import Admin from "./pages/Admin/Admin";
import WithAdminAuth from "./hoc/withAdminAuth";
import AdminToolbar from "./Components/AdminToolbar/AdminToolbar";
import AdminLayout from "./Layout/AdminLayout";
const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  });

  return (
    <React.Fragment>
      <BrowserRouter>
        <AdminToolbar />
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
            render={() => EditModule}
            exact={true}
          ></Route>
          <Route
            path="/Home/UserProfile"
            render={() => (
              <WithAuth>
                <MainLayout>
                  <UserProfile />
                </MainLayout>
              </WithAuth>
            )}
            exact={true}
          ></Route>
          <Route
            path="/admin"
            render={() => (
              <WithAdminAuth>
                <AdminLayout>
                  <Admin />
                </AdminLayout>
              </WithAdminAuth>
            )}
            exact={true}
          ></Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
