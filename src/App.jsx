import React, { useState } from "react";
import classnames from "classnames";

import ParticlesComponent from "./components/particles";
import TitleContainer from "./components/homeTitle/";

import "./App.less";

function App() {
  const [fireState, setFireState] = useState("fire");

  return (
    <div className="App">
      <div
        onMouseEnter={() => setFireState("fireHover")}
        onMouseLeave={() => setFireState("fire")}
        className={classnames(fireState)}
      >
        <div className="fire-left">
          <div className="main-fire"></div>
          <div className="particle-fire"></div>
        </div>
        <div className="fire-main">
          <div className="main-fire"></div>
          <div className="particle-fire"></div>
        </div>
        <div className="fire-right">
          <div className="main-fire"></div>
          <div className="particle-fire"></div>
        </div>
        <div className="fire-bottom">
          <div className="main-fire"></div>
        </div>
      </div>

      <TitleContainer />
      <ParticlesComponent />
    </div>
  );
}

export default App;
