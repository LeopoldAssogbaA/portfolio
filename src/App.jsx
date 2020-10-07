import React from "react";
import Particles from "react-tsparticles";
import "./App.less";

import AnimatedCursor from "react-animated-cursor";

function App() {
  return (
    <div className="App">
      <AnimatedCursor
        innerSize={20}
        outerSize={8}
        color="193, 11, 111"
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={5}
      />
      <div className="titleContainer">
        <h1>- Léopold Assogba ; Portfolio -</h1>
      </div>
      <Particles
        className="particlesContainer"
        options={{
          background: {
            color: {
              value: "#000000",
            },
            image: "url(/assets/img/backgroundCropped.jpg)",
            size: "90% auto",
            repeat: "no-repeat",
            position: "bottom",
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "repulse",
              },
              onHover: {
                enable: true,
                mode: "bubble",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 150,
                duration: 2,
                opacity: 0.8,
                size: 4,
              },
              repulse: {
                distance: 150,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffcc00",
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "top",
              enable: true,
              outMode: "out",
              random: false,
              speed: 4,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 1000,
              },
              value: 400,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 2,
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}

export default App;
