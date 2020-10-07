import React from "react";
import "./App.css";
import Particles from "react-particles-js";

function App() {
  return (
    <div className="App">
      <Particles
        className="particlesContainer"
        params={{
          width: "100%",
          height: "100%",
          background: {
            color: {
              value: "#000000",
            },
          },
          particles: {
            color: {
              value: "#edd72e",
            },
            number: {
              value: 400,
              density: {
                enable: false,
              },
            },
            size: {
              value: 1.5,
              random: true,
              anim: {
                speed: 3,
                size_min: 0.3,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              direction: "top",
              enable: true,
              outMode: "out",
              random: true,
              speed: 3.5,
              straight: false,
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
              onclick: {
                enable: true,
                mode: "",
              },
            },
            modes: {
              bubble: {
                distance: 250,
                duration: 2,
                size: 0,
                opacity: 0,
              },
              repulse: {
                distance: 400,
                duration: 4,
              },
            },
          },
        }}
      />
    </div>
  );
}

export default App;
