import React, { useState } from "react";
import { useLocation } from "react-router";
import Header from "../Components/Header/Header";
import HomeContainer from "../Components/HomeContainer/HomeContainer";

export const HomeContext = React.createContext("");

function HomePageLayout(props) {
  const { state } = useLocation();
  const [currentCategory, setcurrentCategory] = useState(state);
  console.log(currentCategory);
  const changeCurrentCategory = (e) => {
    setcurrentCategory(e);
  };
  return (
    <React.Fragment>
      <HomeContext.Provider value={{ currentCategory, changeCurrentCategory }}>
        <Header {...props} />
        <HomeContainer />
      </HomeContext.Provider>
    </React.Fragment>
  );
}

export default HomePageLayout;
