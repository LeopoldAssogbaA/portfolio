import React, { useEffect, useRef } from "react";
import { Route, Switch } from "react-router";
import gsap from "gsap";

import ParticlesComponent from "./components/particles";
import HomeContainer from "./components/home/";
import history from "./constants/history";

import "./App.less";
import Header from "./components/header";

function App() {
  let particlesRef = useRef(null);
  let appRef = useRef(null);

  const tl = gsap.timeline({ duration: 1.5, ease: "power3" });

  const redirectFromMenu = (page) => {
    console.log("page", page);
    tl.to(particlesRef, { duration: 2, opacity: 0, y: "10%" });
    setTimeout(() => {
      history.push(page);
    }, 1000);
  };

  return (
    <div className="App" ref={(el) => (appRef = el)}>
      <Switch>
        <Route exact path={"/"}>
          <div className="homeContainer" ref={(el) => (particlesRef = el)}>
            <ParticlesComponent />
          </div>
          <HomeContainer goToPortfolio={(page) => redirectFromMenu(page)} />
        </Route>
        <Route exact path={"/about"}>
          <Header />
          <div>About</div>
        </Route>
        <Route exact path={"/contact"}>
          <Header />
          <div>Contact</div>
        </Route>
        <Route exact path={"/git"}>
          <Header />
          <div>Git</div>
        </Route>
        <Route exact path={"/dev"}>
          <Header />
          <div>Dev</div>
        </Route>
        <Route exact path={"/music"}>
          <Header />
          <div>Music</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
