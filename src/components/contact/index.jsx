import React from "react";
import "./index.less";

import { Engine, RenderClones, Walls, Rectangle } from "react-matter-js";
import { Global, css } from "@emotion/core";

const Contact = () => {
  const width = 600;
  const height = 400;
  return (
    <div>
      <Global
        styles={css`
          body {
            background: #111;
          }
        `}
      />
      <Engine options={{}}>
        <RenderClones
          enableMouse
          options={{
            width,
            height,
            background: "transparent",
            wireframeBackground: "transparent",
          }}
        >
          <Walls x={0} y={0} width={width} height={height} wallWidth={1} />
          <Rectangle clone x={100} y={100} width={100} height={100} />
          <Rectangle clone x={200} y={150} width={100} height={100} />
          <Rectangle clone x={300} y={200} width={100} height={100} />
        </RenderClones>
      </Engine>
      <div>
        <a href="https://github.com/slikts/react-matter-js">react-matter-js</a>
      </div>
    </div>
  );
};

export default Contact;
