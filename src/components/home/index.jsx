import React, { useEffect, useRef, useState } from "react";
import { Wave } from "react-animated-text";
import gsap from "gsap";

import "./index.less";

const HomeContainer = ({ goToPortfolio }) => {
  const [paused, setPaused] = useState(true);
  let menuRef = useRef(null);
  let c = useRef(null);

  const removeMenu = () => {
    gsap.to(menuRef, {
      duration: 1.5,
      ease: "power3",
      opacity: 0,
      y: "-50%",
    });
  };

  useEffect(() => {
    gsap.from(c, {
      visibility: "hidden",
      duration: 0,
    });
    gsap.from(c, {
      opacity: 0,
      duration: 2,
      delay: 2,
    });
  }, []);

  useEffect(() => {
    const isMobile = () => {
      const ua = navigator.userAgent;
      return /Android|Mobi/i.test(ua);
    };
    setTimeout(() => {
      if (isMobile() && paused) {
        setPaused(false);
      }
    }, 3000);
  }, [paused]);

  useEffect(() => {
    const isMobile = () => {
      const ua = navigator.userAgent;
      return /Android|Mobi/i.test(ua);
    };

    if (!paused && isMobile() !== true) {
      gsap.to(".link", { paddingRight: "1em", duration: 1, delay: 1 });
    }
  }, [paused]);

  return (
    <>
      <div className="titleContainer" ref={(el) => (c = el)}>
        <div className="wordContainer">
          <span>
            <Wave
              text="- Léopold Assogba ; Portfolio -"
              effect="verticalFadeOut"
              effectChange={2.5}
              effectDirection="up"
              iterations={1}
              paused={paused}
              speed={50}
            />
          </span>
        </div>
      </div>
      <div className="titleContainer revealed" ref={(el) => (menuRef = el)}>
        <div className="wordContainer">
          <span
            className="link"
            onMouseEnter={() => setPaused(false)}
            onClick={() => {
              goToPortfolio("/about");
              removeMenu();
            }}
          >
            <Wave
              text="  About"
              effect="verticalFadeIn"
              effectChange={2.5}
              effectDirection="/down"
              iterations={1}
              paused={paused}
              speed={40}
            />
          </span>
          <span
            className="link"
            onMouseEnter={() => setPaused(false)}
            onClick={() => {
              goToPortfolio("/contact");
              removeMenu();
            }}
          >
            <Wave
              text=" Contact "
              effect="verticalFadeIn"
              effectChange={2.5}
              effectDirection="down"
              iterations={1}
              paused={paused}
              speed={30}
            />
          </span>
          <span
            className="link"
            onMouseEnter={() => setPaused(false)}
            onClick={() => {
              goToPortfolio("/git");
              removeMenu();
            }}
          >
            <Wave
              text="Git"
              effect="verticalFadeIn"
              effectChange={2.5}
              effectDirection="down"
              iterations={1}
              paused={paused}
              speed={10}
            />
          </span>
          <span
            className="link"
            onMouseEnter={() => setPaused(false)}
            onClick={() => {
              goToPortfolio("/dev");
              removeMenu();
            }}
          >
            <Wave
              text=" Dev"
              effect="verticalFadeIn"
              effectChange={2.5}
              effectDirection="down"
              iterations={1}
              paused={paused}
              speed={7.5}
            />
          </span>
          <span
            className="link"
            onMouseEnter={() => setPaused(false)}
            onClick={() => {
              goToPortfolio("/music");
              removeMenu();
            }}
          >
            <Wave
              text=" Music "
              effect="verticalFadeIn"
              effectChange={2.5}
              effectDirection="down"
              iterations={1}
              paused={paused}
              speed={5}
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default HomeContainer;
