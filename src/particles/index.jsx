import React from "react";
import Particles from "react-tsparticles";

import "./index.less";

const ParticlesComponent = () => {
  return (
    <>
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
              value: "#874B05",
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
                value_area: 6000,
              },
              value: 300,
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
      <Particles
        className="littleParticlesContainer"
        options={{
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
                size: 3.5,
              },
              repulse: {
                distance: 150,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#C67D30",
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "top",
              enable: true,
              outMode: "out",
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 300,
              },
              value: 150,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 0.5,
            },
          },
          detectRetina: true,
        }}
      />
    </>
  );
};

export default ParticlesComponent;
