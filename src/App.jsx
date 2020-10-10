import React, { useRef } from "react";

import ParticlesComponent from "./components/particles";
import TitleContainer from "./components/homeTitle/";

import gsap from "gsap";

import "./App.less";

function App() {
  let particlesRef = useRef(null);
  let fireRef = useRef(null);

  const tl = gsap.timeline({ duration: 0.8, ease: "power3" });

  const redirectFromMenu = (page) => {
    console.log("page", page);
    tl.to(particlesRef, { opacity: 0, y: "10%" });
    tl.to(fireRef, { opacity: 1 });
  };

  return (
    <div className="App">
      <div className="fireHover" ref={(el) => (fireRef = el)}>
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
      <TitleContainer goToPortfolio={(page) => redirectFromMenu(page)} />
      <div ref={(el) => (particlesRef = el)}>
        <ParticlesComponent />
      </div>
    </div>
  );
}

export default App;
