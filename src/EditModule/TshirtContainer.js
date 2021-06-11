import React, { useContext } from "react";
import tshirt from "./images/crew_front.png";
import { Home } from "./EditModule";

function TshirtContainer() {
  const { tshirtProps } = useContext(Home);

  return (
    <div className="tshirtContainer" id="tshirtContainer">
      <div className="img-container" style={{ backgroundColor: tshirtProps }}>
        <img className="tshirt-img" src={tshirt} alt="" />

        <div
          className="drawingArea"
          style={{
            position: "absolute",
            top: "100px",
            left: "160px",
            zIndex: 10,
            width: "200px",
            height: "400px",
          }}
        >
          <canvas id="tcanvas" width={200} height={400} />
        </div>
      </div>
    </div>
  );
}

export default TshirtContainer;
