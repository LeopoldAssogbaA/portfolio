import gsap from "gsap/gsap-core";
import React, { useEffect, useRef } from "react";
import Particles from "react-tsparticles";

import "./index.less";

const ParticlesComponent = () => {
  let c = useRef(null);

  useEffect(() => {
    gsap.from(c, {
      visibility: "hidden",
      duration: 0,
    });
    gsap.from(c, {
      opacity: 0,
      duration: 2,
    });
  }, []);

  return (
    <div className="particlesComponent" ref={(el) => (c = el)}>
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
        className="litleParticlesContainer"
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
    </div>
  );
};

export default ParticlesComponent;
