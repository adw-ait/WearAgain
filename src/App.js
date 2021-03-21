import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import HomePageLayout from "./Layout/HomePageLayout";
import LandingPageLayout from "./Layout/LandingPageLayout";
import ProductDetailsLayout from "./Layout/ProductDetailsLayout";
import EditModule from "./EditModule/EditModule";
import RegisterLoginLayout from "./Layout/RegisterLoginLayout";
import { auth, handleUserProfile } from "./firebase/utils";

const initialState = {
  currentUser: null,
};
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
    };
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      }
      this.setState({
        ...initialState,
      });
    });
  }

  componentWillUnmount() {
    this.authListener();
  }
  render() {
    const { currentUser } = this.state;

    return (
      <div className="">
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              render={() => <LandingPageLayout currentUser={currentUser} />}
              exact={true}
            ></Route>
            <Route
              path="/Home"
              render={() => <HomePageLayout currentUser={currentUser} />}
              exact={true}
            ></Route>
            <Route
              path="/Home/SignUp"
              render={() =>
                currentUser ? (
                  <Redirect to="/" />
                ) : (
                  <RegisterLoginLayout currentUser={currentUser} />
                )
              }
              exact={true}
            ></Route>
            <Route
              path="/Home/:id"
              render={() => <ProductDetailsLayout currentUser={currentUser} />}
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
  }
}

export default App;
