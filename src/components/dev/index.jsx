import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import gsap from "gsap";
import { Button, Col, Row } from "antd";
import {
  LeftCircleOutlined,
  RightCircleOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import { Power2 } from "gsap/gsap-core";

import codeIcons from "../../constants/codeIcons";
import devProjects from "../../constants/devProjects";

import "./index.less";
import { withRouter } from "react-router-dom";
import { TimelineLite } from "gsap/gsap-core";

// TODO: handle lifecycle bug on page

const DevComponent = ({ history, setCursorState }) => {
  // MatterJS
  const canvasRef = useRef(null);
  const boxRef = useRef(null);
  const [launched, setLauchend] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);
  // const [projectVisible, setProjectVisible] = useState(true);

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
          background: "transparent",
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

      setLauchend(true);
      // clear matterJS if not on page
      history.listen((location, action) => {
        // console.log(action, location.pathname);
        if (location.pathname !== "/dev") {
          setLauchend(false);
          World.clear(world);
          Engine.clear(engine);
        }
      });
    }
  }, [launched, history]);

  // GSAP
  let titleRevealRef = useRef();
  let companyRevealRef = useRef();
  let dateRevealRef = useRef();
  let stackRevealRef = useRef();
  let descriptionRevealRef = useRef();

  useEffect(() => {
    // title
    gsap.to(".title", {
      duration: 0,
      delay: 0.5,
      opacity: 1,
    });
    gsap.to(titleRevealRef, {
      duration: 0.5,
      width: 0,
      delay: 0.5,
      ease: Power2.easeOut,
    });
    // company name
    gsap.to(".companyName", {
      duration: 0,
      delay: 0.7,
      opacity: 1,
    });
    gsap.to(companyRevealRef, {
      duration: 0.5,
      width: 0,
      delay: 0.7,
      ease: Power2.easeOut,
    });
    // company name
    gsap.to(".date", {
      duration: 0.5,
      delay: 0.9,
      opacity: 1,
    });
    gsap.to(dateRevealRef, {
      duration: 0.5,
      width: 0,
      delay: 0.9,
      ease: Power2.easeOut,
    });
    // stack
    gsap.to(".stack", {
      duration: 0,
      delay: 1.1,
      opacity: 1,
    });
    gsap.to(stackRevealRef, {
      duration: 0.5,
      width: 0,
      delay: 1.1,
      ease: Power2.easeOut,
    });
    // description
    gsap.to(".description", {
      duration: 0,
      delay: 1.3,
      opacity: 1,
    });
    gsap.to(descriptionRevealRef, {
      duration: 0.5,
      width: 0,
      delay: 1.3,
      ease: Power2.easeOut,
    });

    gsap.to(".mockupContainer", {
      duration: 1,
      opacity: 1,
      delay: 1.8,
    });
    gsap.to(".devContainer", {
      duration: 1,
      opacity: 1,
    });
    const tl = new TimelineLite();
    tl.staggerTo(
      ".arrowsContainer svg",
      0.5,
      {
        opacity: 1,
        scale: 1,
        borderRadius: "50%",
        transformOrigin: "50% 50%",
        delay: 1.6,
      },
      0.1
    );
  });

  const prevProject = () => {
    // setProjectVisible(false);
    const tl = new TimelineLite();
    tl.staggerTo(
      ".arrowsContainer svg",
      0.5,
      {
        opacity: 0,
        scale: 0,
        borderRadius: "50%",
        transformOrigin: "50% 50%",
      },
      0.1
    );
    gsap.to(titleRevealRef, {
      duration: 0.5,
      width: "100%",
      ease: Power2.easeIn,
    });
    gsap.to(".title", {
      duration: 0,
      delay: 0.5,
      opacity: 0,
    });
    //  // company name
    gsap.to(companyRevealRef, {
      duration: 0.5,
      width: "100%",
      delay: 0.2,
      ease: Power2.easeIn,
    });
    gsap.to(".companyName", {
      duration: 0,
      delay: 0.7,
      opacity: 1,
    });
    //  // company name
    gsap.to(dateRevealRef, {
      duration: 0.5,
      width: "60%",
      delay: 0.4,
      ease: Power2.easeIn,
    });
    gsap.to(".date", {
      duration: 0.5,
      delay: 0.9,
      opacity: 0,
    });
    //  // stack
    gsap.to(stackRevealRef, {
      duration: 0.5,
      width: "60%",
      delay: 0.6,
      ease: Power2.easeIn,
    });
    gsap.to(".stack", {
      duration: 0,
      delay: 1.1,
      opacity: 0,
    });
    //  // description
    gsap.to(descriptionRevealRef, {
      duration: 0.5,
      width: "100%",
      delay: 0.8,
      ease: Power2.easeIn,
    });
    gsap.to(".description", {
      duration: 0,
      delay: 1.3,
      opacity: 0,
    });

    gsap.to(".mockupContainer", {
      duration: 0.5,
      opacity: 0,
      delay: 1,
    });
    if (projectIndex === 0) {
      setTimeout(() => {
        setProjectIndex(devProjects.length - 1);
      }, 1800);
    } else {
      setTimeout(() => {
        setProjectIndex((state) => (state -= 1));
      }, 1800);
    }
  };

  const nextProject = () => {
    const tl = new TimelineLite();
    tl.staggerTo(
      ".arrowsContainer svg",
      0.5,
      {
        opacity: 0,
        scale: 0,
        borderRadius: "50%",
        transformOrigin: "50% 50%",
      },
      0.1
    );
    gsap.to(titleRevealRef, {
      duration: 0.5,
      width: "60%",
      ease: Power2.easeIn,
    });
    gsap.to(".title", {
      duration: 0,
      delay: 0.5,
      opacity: 0,
    });
    //  // company name
    gsap.to(companyRevealRef, {
      duration: 0.5,
      width: "100%",
      delay: 0.2,
      ease: Power2.easeIn,
    });
    gsap.to(".companyName", {
      duration: 0,
      delay: 0.7,
      opacity: 1,
    });
    //  // company name
    gsap.to(dateRevealRef, {
      duration: 0.5,
      width: "60%",
      delay: 0.4,
      ease: Power2.easeIn,
    });
    gsap.to(".date", {
      duration: 0.5,
      delay: 0.9,
      opacity: 0,
    });
    //  // stack
    gsap.to(stackRevealRef, {
      duration: 0.5,
      width: "60%",
      delay: 0.6,
      ease: Power2.easeIn,
    });
    gsap.to(".stack", {
      duration: 0,
      delay: 1.1,
      opacity: 0,
    });
    //  // description
    gsap.to(descriptionRevealRef, {
      duration: 0.5,
      width: "100%",
      delay: 0.8,
      ease: Power2.easeIn,
    });
    gsap.to(".description", {
      duration: 0,
      delay: 1.3,
      opacity: 0,
    });

    gsap.to(".mockupContainer", {
      duration: 0.5,
      opacity: 0,
      delay: 1,
    });
    if (projectIndex === devProjects.length - 1) {
      setTimeout(() => {
        setProjectIndex(0);
      }, 1800);
    } else {
      setTimeout(() => {
        setProjectIndex((state) => (state += 1));
      }, 1800);
    }
  };

  const mockupLayout = {
    xs: { span: 24, offset: 0, order: 2 },
    sm: { span: 24, offset: 0, order: 2 },
    md: { span: 8, offset: 1, order: 1 },
    lg: { span: 8, offset: 2, order: 1 },
  };

  const texLayout = {
    xs: { span: 24, offset: 0, order: 1 },
    sm: { span: 24, offset: 0, order: 1 },
    md: { span: 12, offset: 1, order: 2 },
    lg: { span: 11, offset: 1, order: 2 },
  };

  return (
    <div className="devContainer">
      <img src="assets/img/window.jpg" alt="window" className="window" />
      <Row>
        <Col {...mockupLayout}>
          <div className="mockupContainer">
            {devProjects[projectIndex].link !== undefined && (
              <Button
                onMouseEnter={() => setCursorState("hover")}
                onMouseLeave={() => setCursorState("notHover")}
                className="link"
                type="link"
                icon={<SelectOutlined />}
                href={devProjects[projectIndex].link}
                target="_blank"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  paddingTop: "21vh",
                }}
              />
            )}
            <img
              src={devProjects[projectIndex].mockup}
              alt="current mockup"
              className="mockup"
              style={
                devProjects[projectIndex].type === "mobile"
                  ? { paddingRight: "5vh", paddingLeft: "5vh" }
                  : {}
              }
            />
            <div className="mockupReveal"></div>
            <div
              className="box"
              ref={boxRef}
              style={
                devProjects[projectIndex].type === "mobile"
                  ? { paddingRight: "5vh", paddingLeft: "5vh" }
                  : {}
              }
            >
              <canvas ref={canvasRef} />
            </div>
          </div>
        </Col>
        <Col {...texLayout}>
          <div className="infosContainer">
            <div>
              <div>
                <div
                  className="titleReveal"
                  ref={(el) => (titleRevealRef = el)}
                ></div>
                <h2 className="title">
                  {`${projectIndex + 1}. ${devProjects[projectIndex].name}`}
                </h2>
              </div>
              <div>
                <div
                  className="companyReveal"
                  ref={(el) => (companyRevealRef = el)}
                ></div>
                <h3 className="companyName">
                  {devProjects[projectIndex].company}
                </h3>
              </div>
              <div>
                <div
                  className="dateReveal"
                  ref={(el) => (dateRevealRef = el)}
                ></div>
                <h3 className="date">{devProjects[projectIndex].date}</h3>
              </div>
              <div>
                <div
                  className="stackReveal"
                  ref={(el) => (stackRevealRef = el)}
                ></div>
                <span className="stack">
                  <b>Stack</b> {devProjects[projectIndex].stack}
                </span>
              </div>
              <div>
                <div
                  className="descriptionReveal"
                  ref={(el) => (descriptionRevealRef = el)}
                ></div>
                <p className="description">
                  {devProjects[projectIndex].description}
                </p>
              </div>
            </div>
          </div>
          <div className="arrowsContainer">
            <Button
              className="link"
              type="link"
              icon={<LeftCircleOutlined style={{ fontSize: "2em" }} />}
              onClick={() => prevProject()}
            ></Button>
            <Button
              className="link"
              type="link"
              icon={<RightCircleOutlined style={{ fontSize: "2em" }} />}
              onClick={() => nextProject()}
            ></Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(DevComponent);
