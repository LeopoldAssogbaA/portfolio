import React, { useRef } from "react";
import { Route, Switch } from "react-router";
import gsap from "gsap";

import ParticlesComponent from "./components/particles";
import HomeContainer from "./components/home/";
import Header from "./components/header";
import About from "./components/about";

import history from "./constants/history";
import "./App.less";
import Contact from "./components/contact";
import GitComponent from "./components/git";
import DevComponent from "./components/dev";
import Music from "./components/music";

//TODO: use .env for token
//TODO: refactor with route object
//TODO: Add responsive rules
//TODO: remove fs package

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
          <About />
        </Route>
        <Route exact path={"/contact"}>
          <Header />
          <Contact />
        </Route>
        <Route exact path={"/git"}>
          <Header />
          <GitComponent />
        </Route>
        <Route exact path={"/dev"}>
          <Header />
          <DevComponent />
        </Route>
        <Route exact path={"/music"}>
          <Header />
          <Music />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
