import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LandingPageLayout from "./Layout/LandingPageLayout";

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
import HomePage from "./pages/HomePage/HomePage";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";

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
            render={() => (
              <MainLayout>
                <HomePage />
              </MainLayout>
            )}
            exact={true}
          ></Route>
          <Route
            path="/Home/:filterType"
            render={() => (
              <MainLayout>
                <HomePage />
              </MainLayout>
            )}
            exact={true}
          ></Route>
          <Route
            path="/product/:productID"
            render={() => (
              <MainLayout>
                <ProductDetails />
              </MainLayout>
            )}
            exact={true}
          ></Route>
          <Route
            path="/cart"
            render={() => (
              <MainLayout>
                <Cart />
              </MainLayout>
            )}
            exact={true}
          ></Route>
          <Route
            path="/SignUp"
            render={() => <RegisterLoginLayout />}
            exact={true}
          ></Route>
          <Route
            path="/UserProfile"
            render={() => (
              <MainLayout>
                <UserProfile />
              </MainLayout>
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
