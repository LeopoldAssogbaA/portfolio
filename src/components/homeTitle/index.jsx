import React, { useEffect, useMemo, useRef, useState } from "react";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { TimelineLite, Power2 } from "gsap";
import { Wave } from "react-animated-text";

import "./index.less";

const TitleContainer = () => {
  const [paused, setPaused] = useState(true);
  const fadeOut = "verticalFadeOut";
  const fadeIn = "verticalFadeIn";

  // TODO: find how to replace letters with onMouseLeave
  return (
    <>
      <div className="titleContainer">
        <p className="wordContainer">
          <span
            onMouseEnter={() => setPaused(!paused)}
            onMouseLeave={() => setPaused(!paused)}
          >
            <Wave
              text="- Léopold"
              effect={paused ? fadeOut : fadeIn}
              effectChange={2.5}
              effectDirection="up"
              iterations={1}
              paused={paused}
              speed={10}
            />
            <Wave
              text=" Assogba"
              effect="verticalFadeOut"
              effectChange={2.5}
              effectDirection="up"
              iterations={2}
              paused={true}
              speed={10}
            />
            <Wave
              text=" ; "
              effect="verticalFadeOut"
              effectChange={2.5}
              effectDirection="up"
              iterations={1}
              paused={true}
              speed={10}
            />
            <Wave
              text="Port"
              effect="verticalFadeOut"
              effectChange={2.5}
              effectDirection="up"
              iterations={1}
              paused={true}
              speed={10}
            />
            <Wave
              text="folio -"
              effect="verticalFadeOut"
              effectChange={2.5}
              effectDirection="up"
              iterations={1}
              paused={true}
              speed={10}
            />
          </span>
        </p>
      </div>
      <div className="titleContainer revealed">
        <p className="wordContainer">
          <span
            onMouseEnter={() => setPaused(!paused)}
            onMouseLeave={() => setPaused(!paused)}
          >
            <Wave
              text="  About"
              effect={paused ? fadeIn : fadeOut}
              effectChange={2.5}
              effectDirection="down"
              iterations={1}
              paused={paused}
              speed={10}
            />
            <Wave
              text=" Contact"
              effect="verticalFadeIn"
              effectChange={2.5}
              effectDirection="down"
              iterations={2}
              paused={true}
              speed={10}
            />
            <Wave
              text="Git"
              effect="verticalFadeIn"
              effectChange={2.5}
              effectDirection="down"
              iterations={1}
              paused={true}
              speed={10}
            />
            <Wave
              text="Dev "
              effect="verticalFadeIn"
              effectChange={2.5}
              effectDirection="down"
              iterations={1}
              paused={true}
              speed={10}
            />
            <Wave
              text="Music  "
              effect="verticalFadeIn"
              effectChange={2.5}
              effectDirection="down"
              iterations={1}
              paused={true}
              speed={10}
            />
          </span>
        </p>
      </div>
    </>
  );
};

export default TitleContainer;
