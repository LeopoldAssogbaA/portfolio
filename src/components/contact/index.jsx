import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

import "./index.less";

export const Contact = () => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const [section, setSection] = useState(null);

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

    const email = Bodies.rectangle(50, 0, 40, 40, {
      restitution: 0.9,
      label: "email",
      render: {
        sprite: {
          texture: "assets/icons/email-y.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    });
    const git = Bodies.rectangle(250, 0, 40, 40, {
      restitution: 0.9,
      label: "github",
      render: {
        sprite: {
          texture: "assets/icons/github-y.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    });
    const linkedin = Bodies.rectangle(50, 0, 40, 40, {
      restitution: 0.9,
      label: "linkedin",
      render: {
        sprite: {
          texture: "assets/icons/linkedin-y.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    });
    const phone = Bodies.rectangle(50, 0, 40, 40, {
      restitution: 0.9,
      label: "phone",
      render: {
        sprite: {
          texture: "assets/icons/phone-y.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    });
    const cv = Bodies.rectangle(250, 0, 50, 50, {
      restitution: 0.9,
      label: "resume",
      render: {
        sprite: {
          texture: "assets/icons/resume-y.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    });

    World.add(engine.world, [
      floor,
      wallRight,
      wallLeft,
      step,
      step2,
      email,
      5,
    ]);
    Engine.run(engine);
    Render.run(render);

    setTimeout(() => {
      World.add(engine.world, [git]);
    }, 200);
    setTimeout(() => {
      World.add(engine.world, [linkedin]);
    }, 400);
    setTimeout(() => {
      World.add(engine.world, [phone]);
    }, 600);
    setTimeout(() => {
      World.add(engine.world, [cv]);
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

    Events.on(email, "mousedown", function (event) {
      console.log("added to world:", event.object);
    });

    Events.on(mouseConstraint, "startdrag", function (event) {
      console.log("startdrag", event);
      switch (event.body.label) {
        case "phone":
          console.log("phone triggered");
          setSection("phone");
          break;
        case "email":
          console.log("email triggered");
          break;
        case "linkedin":
          console.log("linkedin triggered");
          break;
        case "github":
          console.log("github triggered");
          break;
        case "resume":
          console.log("resume triggered");
          break;
        default:
          return null;
      }
    });
  }, []);
  console.log(section);
  return (
    <div ref={boxRef} className="contactContainer">
      <canvas ref={canvasRef} />
      {section === "phone" && <div className="phone">Phone</div>}
    </div>
  );
};

export default Contact;
