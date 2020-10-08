import React, { useState } from "react";
import classnames from "classnames";

import ParticlesComponent from "./particles";

import "./App.less";

function App() {
  const [fireState, setFireState] = useState("fire");
  const changeText = (target) => {
    console.log("change", target);
  };

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
      <div className="titleContainer">
        <h1>
          <span id="about" onMouseEnter={() => changeText("about")}>
            Léopold{" "}
          </span>
          <span id="contact" onMouseEnter={() => changeText("contact")}>
            Assogba
          </span>
          <span id="git" onMouseEnter={() => changeText("git")}>
            {" "}
            ;{" "}
          </span>
          <span id="dev" onMouseEnter={() => changeText("dev")}>
            Port
          </span>
          <span id="music" onMouseEnter={() => changeText("music")}>
            folio
          </span>
        </h1>
      </div>
      <ParticlesComponent />
    </div>
  );
}

export default App;
