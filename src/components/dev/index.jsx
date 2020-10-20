import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Col, Row } from "antd";

import codeIcons from "./codeIcons";

import "./index.less";
// TODO: handle lifecycle bug on page

const DevComponent = () => {
  const canvasRef = useRef(null);
  const boxRef = useRef(null);
  const [launched, setLauchend] = useState(false);

  useEffect(() => {
    if (!launched) {
      var Engine = Matter.Engine,
        Events = Matter.Events,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World;

      // create engine
      var engine = Engine.create(),
        world = engine.world;

      // create renderer
      var render = Render.create({
        engine: engine,
        element: boxRef.current,
        canvas: canvasRef.current,
        options: {
          width: 200,
          height: 980,
          wireframes: false,
          background: "black",
        },
      });
      engine.world.gravity.y = 0.05;

      Render.run(render);

      // create runner
      var runner = Runner.create();
      Runner.run(runner, engine);

      for (let i = 0; i < codeIcons.length; i += 1) {
        World.add(world, [codeIcons[i].element]);
      }
      // World.add(world, [codeIcons[0].element]);

      var timeScaleTarget = 1,
        counter = 0;

      Events.on(engine, "afterUpdate", function (event) {
        // tween the timescale for slow-mo
        counter += 1;

        // every 1.5 sec
        if (counter >= 60 * 1.5) {
          // flip the timescale
          if (timeScaleTarget < 1) {
            timeScaleTarget = 1;
          } else {
            timeScaleTarget = 0.05;
          }

          // reset counter
          counter = 0;
        }

        for (let i = 0; i < codeIcons.length; i += 1) {
          let element = codeIcons[i].element;

          if (element.bounds.min.y > render.bounds.max.y + 100) {
            Body.translate(element, {
              x: render.bounds.min.x,
              y: -render.bounds.max.y - 300,
            });
          }
        }
      });

      // add mouse control and make the mouse revolute
      var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.6,
            length: 0,
            angularStiffness: 0,
            render: {
              visible: false,
            },
          },
        });

      World.add(world, mouseConstraint);
      console.log("lauched");

      // keep the mouse in sync with rendering
      render.mouse = mouse;

      // fit the render viewport to the scene
      Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 200, y: 980 },
      });

      setLauchend(true);
    }
  }, [launched]);
  // <Col span={4} ref={boxRef}>
  //   <canvas ref={canvasRef} />
  // </Col>
  /* <div className="mockups">
    <img
      src="assets/mockups/webinar.png"
      alt="current mockup"
      className="img1"
    />
  </div> */

  // Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  return (
    <div className="devContainer">
      <img src="assets/img/window.jpg" alt="window" className="window" />
      <Row>
        <Col span={12} offset={2}>
          <div className="mockupContainer">
            <img
              src="assets/mockups/webinar.png"
              alt="current mockup"
              className="mockup"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DevComponent;
