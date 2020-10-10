import React, { useRef, useState } from "react";
import { Wave } from "react-animated-text";
import gsap from "gsap";

import "./index.less";

const TitleContainer = ({ goToPortfolio }) => {
  const [paused, setPaused] = useState(true);
  let menuRef = useRef(null);

  const removeMenu = () => {
    gsap.to(menuRef, {
      duration: 1,
      ease: "power3",
      opacity: 0,
      y: "-50%",
    });
  };

  return (
    <>
      <div className="titleContainer">
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
            onMouseEnter={() => setPaused(false)}
            onClick={() => {
              goToPortfolio("about");
              removeMenu();
            }}
          >
            <Wave
              text="  About"
              effect="verticalFadeIn"
              effectChange={2.5}
              effectDirection="down"
              iterations={1}
              paused={paused}
              speed={40}
            />
          </span>
          <span
            onMouseEnter={() => setPaused(false)}
            onClick={() => goToPortfolio("contact")}
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
            onMouseEnter={() => setPaused(false)}
            onClick={() => goToPortfolio("git")}
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
            onMouseEnter={() => setPaused(false)}
            onClick={() => goToPortfolio("dev")}
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
            onMouseEnter={() => setPaused(false)}
            onClick={() => goToPortfolio("music")}
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

export default TitleContainer;
