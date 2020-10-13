import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

import "./index.less";

export const Contact = () => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let Body = Matter.Body;
    let Mouse = Matter.Mouse;
    let MouseConstraint = Matter.MouseConstraint;
    let Engine = Matter.Engine;
    let Render = Matter.Render;
    let World = Matter.World;
    let Bodies = Matter.Bodies;
    let Events = Matter.Events;
    let engine = Engine.create({});
    let render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: 300,
        height: 300,
        background: "black",
        wireframes: false,
      },
    });

    const floor = Bodies.rectangle(150, 300, 300, 10, {
      isStatic: true,
      render: {
        fillStyle: "black",
      },
    });

    const wallRight = Bodies.rectangle(0, 300, 600, 10, {
      isStatic: true,
      render: {
        fillStyle: "black",
      },
    });
    Body.rotate(wallRight, Math.PI / 2);

    const wallLeft = Bodies.rectangle(300, 300, 600, 10, {
      isStatic: true,
      render: {
        fillStyle: "black",
      },
    });
    Body.rotate(wallLeft, Math.PI / 2);

    const step = Bodies.rectangle(300, 60, 200, 5, {
      isStatic: true,
      render: {
        fillStyle: "black",
      },
    });
    Body.rotate(step, -Math.PI / 5);
    const step2 = Bodies.rectangle(0, 60, 200, 5, {
      isStatic: true,
      render: {
        fillStyle: "black",
      },
    });
    Body.rotate(step2, Math.PI / 5);

    const ball = Bodies.rectangle(50, 0, 40, 40, {
      restitution: 0.9,
      render: {
        sprite: {
          texture: "assets/icons/email-y.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    });
    const ball2 = Bodies.rectangle(250, 0, 40, 40, {
      restitution: 0.9,
      render: {
        sprite: {
          texture: "assets/icons/github-y.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    });
    const ball3 = Bodies.rectangle(50, 0, 40, 40, {
      restitution: 0.9,
      render: {
        sprite: {
          texture: "assets/icons/linkedin-y.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    });
    const ball4 = Bodies.rectangle(50, 0, 40, 40, {
      restitution: 0.9,
      render: {
        sprite: {
          texture: "assets/icons/phone-y.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    });
    const ball5 = Bodies.rectangle(250, 0, 50, 50, {
      restitution: 0.9,
      render: {
        sprite: {
          texture: "assets/icons/pdf-y.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    });

    World.add(engine.world, [floor, wallRight, wallLeft, step, step2, ball, 5]);
    Engine.run(engine);
    Render.run(render);

    setTimeout(() => {
      World.add(engine.world, [ball2]);
    }, 200);
    setTimeout(() => {
      World.add(engine.world, [ball3]);
    }, 400);
    setTimeout(() => {
      World.add(engine.world, [ball4]);
    }, 600);
    setTimeout(() => {
      World.add(engine.world, [ball5]);
    }, 800);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

    World.add(engine.world, mouseConstraint);

    Events.on(ball, "mousedown", function (event) {
      console.log("added to world:", event.object);
    });
    Matter.Events.on(mouseConstraint, "mousedown", function (event) {
      console.log("clicked");
    });
  }, []);
  return (
    <div ref={boxRef} className="contactContainer">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Contact;
