import React from "react";
import Header from "../Components/Header/Header";

function MainLayout(props) {
  return (
    <React.Fragment>
      <Header />
      <div className="main">{props.children}</div>
    </React.Fragment>
  );
}

export default MainLayout;
