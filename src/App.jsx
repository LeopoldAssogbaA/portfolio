import React, { useRef } from "react";
import { Route, Switch } from "react-router-dom";
import gsap from "gsap";

import ParticlesComponent from "./components/particles";
import HomeContainer from "./components/home/";
import Header from "./components/header";
import About from "./components/about";
import Contact from "./components/contact";
import GitComponent from "./components/git";
import DevComponent from "./components/dev";
import Music from "./components/music";

import history from "./constants/history";
import "./App.less";
import Cursor from "./components/cutomCursor";
import { useState } from "react";

//TODO: use .env for token
//TODO: refactor with route object
//TODO: Add responsive rules
//TODO: remove fs package

function App() {
  let particlesRef = useRef(null);
  const [cursorState, setCursorState] = useState(null);
  const [player, setPlayer] = useState(null);
  const [track, setTrack] = useState(null);

  const registerPlayer = (p) => {
    // console.log(p);
    setPlayer(p);
  };
  const pausePlayer = () => {
    player.pause();
    setPlayer(null);
  };

  const registerTrack = (trackIndex, bandIndex) => {
    setTrack({ trackIndex, bandIndex });
  };

  const tl = gsap.timeline({ duration: 1.5, ease: "power3" });

  const redirectFromMenu = (page) => {
    // console.log("page", page);
    tl.to(particlesRef, { duration: 2, opacity: 0, y: "10%" });
    setTimeout(() => {
      history.push(page);
    }, 1000);
  };

  const isMobile = () => {
    const ua = navigator.userAgent;
    return /Android|Mobi/i.test(ua);
  };

  // console.log("isMobile", isMobile());

  return (
    <div className="App">
      {!isMobile() && <Cursor cursorStateEvent={cursorState} />}
      <Switch>
        <Route exact path={"/"}>
          <div className="homeContainer" ref={(el) => (particlesRef = el)}>
            <ParticlesComponent />
          </div>
          <HomeContainer goToPortfolio={(page) => redirectFromMenu(page)} />
        </Route>
        <Route exact path={"/about"}>
          <Header player={player} pausePlayer={pausePlayer} />
          <About
            setCursorState={(cursorState) => setCursorState(cursorState)}
          />
        </Route>
        <Route exact path={"/contact"}>
          <Header player={player} pausePlayer={pausePlayer} />
          <Contact
            setCursorState={(cursorState) => setCursorState(cursorState)}
          />
        </Route>
        <Route exact path={"/git"}>
          <Header player={player} pausePlayer={pausePlayer} />
          <GitComponent
            setCursorState={(cursorState) => setCursorState(cursorState)}
          />
        </Route>
        <Route exact path={"/dev"}>
          <Header player={player} pausePlayer={pausePlayer} />
          <DevComponent
            setCursorState={(cursorState) => setCursorState(cursorState)}
          />
        </Route>
        <Route exact path={"/music"}>
          <Header player={player} pausePlayer={pausePlayer} />
          <Music
            track={track}
            prevPlayer={player}
            setCursorState={(cursorState) => setCursorState(cursorState)}
            registerPlayer={(p) => registerPlayer(p)}
            registerTrack={(tI, bI) => registerTrack(tI, bI)}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
