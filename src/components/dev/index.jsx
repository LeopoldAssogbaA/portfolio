import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { Col, Row } from "antd";

import codeIcons from "./codeIcons";

import "./index.less";

const DevComponent = () => {
  const canvasRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
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

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 200, y: 980 },
    });
  }, []);

  return (
    <div className="devContainer">
      <Row>
        <Col span={4} ref={boxRef}>
          <canvas ref={canvasRef} />
        </Col>
        <Col span={18}></Col>
        <Col span={2}></Col>
      </Row>
    </div>
  );
};

export default DevComponent;
