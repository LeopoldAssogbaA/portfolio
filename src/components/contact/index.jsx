import React, { useEffect, useRef, useState } from "react";
import {
  ArrowDownOutlined,
  DownloadOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import Matter from "matter-js";

import "./index.less";
import gsap, { Elastic, Power3 } from "gsap/gsap-core";
import { Bounce } from "gsap/gsap-core";
import { Linear } from "gsap/gsap-core";
import { Back } from "gsap/gsap-core";

// TODO: enhance page animation

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
        background: "transparent",
        wireframes: false,
      },
    });

    const floor = Bodies.rectangle(150, 300, 300, 10, {
      isStatic: true,
      render: {
        fillStyle: "transparent",
      },
    });

    const top = Bodies.rectangle(150, 0, 300, 10, {
      isStatic: true,
      render: {
        fillStyle: "transparent",
      },
    });

    const wallRight = Bodies.rectangle(0, 300, 600, 10, {
      isStatic: true,
      render: {
        fillStyle: "transparent",
      },
    });
    Body.rotate(wallRight, Math.PI / 2);

    const wallLeft = Bodies.rectangle(300, 300, 600, 10, {
      isStatic: true,
      render: {
        fillStyle: "transparent",
      },
    });
    Body.rotate(wallLeft, Math.PI / 2);

    const step = Bodies.rectangle(300, 60, 100, 5, {
      isStatic: true,
      render: {
        fillStyle: "transparent",
      },
    });
    Body.rotate(step, -Math.PI / 5);
    const step2 = Bodies.rectangle(0, 60, 100, 5, {
      isStatic: true,
      render: {
        fillStyle: "transparent",
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
      top,
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

    Matter.Events.on(mouseConstraint, "mousemove", function (event) {
      //For Matter.Query.point pass "array of bodies" and "mouse position"
      var foundPhysics = Matter.Query.point(
        [email, phone, git, linkedin, cv],
        event.mouse.position
      );
      if (foundPhysics.length !== 0) {
        document.getElementById("canvas").style.cursor = "pointer";
      } else {
        document.getElementById("canvas").style.cursor = "default";
      }
    });

    Events.on(mouseConstraint, "startdrag", function (event) {
      console.log("startdrag", event);

      gsap.to(".illustration", {
        duration: 0.6,
        maskImage:
          "radial-gradient(closest-side,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0))",
      });
      gsap.to(".linkButton", {
        duration: 0.5,
        top: "120%",
        opacity: 0,
        ease: Back.easeIn,
        scale: 0.8,
        transform: "rotate3d(1, 1, 1, 90deg)",
        onComplete: () =>
          gsap.to(".linkButton", {
            duration: 0,
            top: "20%",
            left: "120%",
            opacity: 0,
            scale: 1,
            transform: "rotate3d(1, 1, 1, 0deg)",
          }),
      });

      switch (event.body.label) {
        case "phone":
          setSection("phone");
          gsap.to(".phone", {
            duration: 0.5,
            maskImage: "radial-gradient(closest-side,#000000,rgba(0, 0, 0, 0))",
            delay: 0.6,
          });
          gsap.to(".phoneButton", {
            duration: 1,
            left: "10%",
            opacity: 1,
            delay: 0.6,
            ease: Bounce.easeOut,
          });
          break;
        case "email":
          setSection("email");
          gsap.to(".email", {
            duration: 0.5,
            maskImage: "radial-gradient(closest-side,#000000,rgba(0, 0, 0, 0))",
            delay: 0.5,
          });
          gsap.to(".emailButton", {
            duration: 1,
            left: "10%",
            opacity: 1,
            delay: 0.6,
            ease: Bounce.easeOut,
          });
          break;
        case "linkedin":
          setSection("linkedin");
          gsap.to(".linkedin", {
            duration: 0.5,
            maskImage: "radial-gradient(closest-side,#000000,rgba(0, 0, 0, 0))",
            delay: 0.5,
          });
          gsap.to(".linkedinButton", {
            duration: 1,
            left: "10%",
            opacity: 1,
            delay: 0.6,
            ease: Bounce.easeOut,
          });
          break;
        case "github":
          setSection("github");
          gsap.to(".git", {
            duration: 0.5,
            maskImage: "radial-gradient(closest-side,#000000,rgba(0, 0, 0, 0))",
            delay: 0.5,
          });
          gsap.to(".gitButton", {
            duration: 1,
            left: "10%",
            opacity: 1,
            delay: 0.6,
            ease: Bounce.easeOut,
          });
          break;
        case "resume":
          setSection("resume");
          gsap.to(".resume", {
            duration: 0.5,
            maskImage: "radial-gradient(closest-side,#000000,rgba(0, 0, 0, 0))",
            delay: 0.5,
          });
          gsap.to(".resumeButton", {
            duration: 1,
            left: "10%",
            opacity: 1,
            delay: 0.6,
            ease: Bounce.easeOut,
          });
          break;
        default:
          return null;
      }
    });
  }, []);

  return (
    <div ref={boxRef} className="contactContainer">
      <img
        src="assets/img/emailBackground.jpg"
        alt="email"
        className="illustration email"
      />
      <img
        src="assets/img/gitBackground2.jpg"
        alt="test"
        className="illustration git"
      />
      <img
        src="assets/img/linkedinBackground.jpg"
        alt="test"
        className="illustration linkedin"
      />
      <img
        src="assets/img/phoneBackground.jpg"
        alt="test"
        className="illustration phone"
      />
      <img
        src="assets/img/resume.jpg"
        alt="test"
        className="illustration resume"
      />
      <canvas ref={canvasRef} id="canvas" />
      <div className="linkButton phoneButton">
        <a href="tel:06-72-58-45-63">
          <Button
            icon={<PhoneOutlined />}
            shape="round"
            size="large"
            type="primary"
          >
            06-72-58-45-63
          </Button>
        </a>
      </div>
      <div className="linkButton emailButton">
        <a href="mailto:leopoldassogba21@gmail.com">
          <Button
            icon={<MailOutlined />}
            shape="round"
            size="large"
            type="primary"
          >
            leopoldassogba21@gmail.com
          </Button>
        </a>
      </div>
      <div className="linkButton linkedinButton">
        <a
          href="https://www.linkedin.com/in/l%C3%A9opold-assogba/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            icon={<LinkedinOutlined />}
            shape="round"
            size="large"
            type="primary"
          >
            Léopold Assogba
          </Button>
        </a>
      </div>
      <div className="linkButton gitButton">
        <a
          href="https://github.com/LeopoldAssogbaA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            icon={<GithubOutlined />}
            shape="round"
            size="large"
            type="primary"
          >
            LeopoldAssogbaA
          </Button>
        </a>
      </div>
      <div className="linkButton resumeButton">
        <a href="assets/pdf/Leopold-Assogba-Resume.pdf" download>
          <Button
            icon={<DownloadOutlined />}
            shape="round"
            size="large"
            type="primary"
          >
            Download Resume
          </Button>
        </a>
      </div>

      {/* {(() => {
        switch (section) {
          case "phone":
            return (
              <div>
                <a href="tel:06-72-58-45-63">
                  <Button
                    icon={<PhoneOutlined />}
                    shape="round"
                    size="large"
                    type="primary"
                  >
                    06-72-58-45-63
                  </Button>
                </a>
              </div>
            );
          case "email":
            return (
              <div>
                <a href="mailto:leopoldassogba21@gmail.com">
                  <Button
                    icon={<MailOutlined />}
                    shape="round"
                    size="large"
                    type="primary"
                  >
                    leopoldassogba21@gmail.com
                  </Button>
                </a>
              </div>
            );
          case "linkedin":
            return (
              <div>
                <a
                  href="https://www.linkedin.com/in/l%C3%A9opold-assogba/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    icon={<LinkedinOutlined />}
                    shape="round"
                    size="large"
                    type="primary"
                  >
                    Léopold Assogba
                  </Button>
                </a>
              </div>
            );
          case "github":
            return (
              <div>
                <a
                  href="https://github.com/LeopoldAssogbaA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    icon={<GithubOutlined />}
                    shape="round"
                    size="large"
                    type="primary"
                  >
                    LeopoldAssogbaA
                  </Button>
                </a>
              </div>
            );
          case "resume":
            return (
              <div>
                <a href="assets/pdf/Leopold-Assogba-Resume.pdf" download>
                  <Button
                    icon={<DownloadOutlined />}
                    shape="round"
                    size="large"
                    type="primary"
                  >
                    Download Resume
                  </Button>
                </a>
              </div>
            );
          default:
            return null;
        }
      })()} */}
    </div>
  );
};

export default Contact;
