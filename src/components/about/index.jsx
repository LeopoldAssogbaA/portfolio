import { Button, Col, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import gsap, { Power2, Power1, Bounce, Linear } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import { RightCircleOutlined } from "@ant-design/icons";

import "./index.less";

const About = ({ setCursorState }) => {
  gsap.registerPlugin(CSSRulePlugin);
  let laptopRevealRef = useRef(null);
  let laptopImgRef = useRef(null);
  let lightRef = useRef(null);
  let devTextContainer = useRef(null);
  let laptop2ImgRef = useRef(null);
  let moonRef = useRef(null);
  let pianoRef = useRef(null);
  let musicTextRef = useRef(null);

  const [section, setSection] = useState(0);
  const sections = ["abstract", "dev", "music"];

  useEffect(() => {
    if (section === 0) {
      gsap.from(".light", {
        duration: 1.6,
        opacity: 0,
        ease: Bounce.easeInOut,
        delay: 0.8,
      });
      gsap.from(".abstract", {
        duration: 1.6,
        opacity: 0,
        ease: Bounce.easeInOut,
        delay: 0.8,
      });
      gsap.to(laptopRevealRef, {
        duration: 1.6,
        height: 0,
        ease: Power2.easeInOut,
        delay: 1.2,
      });
    } else if (section === 1) {
      gsap.to(lightRef, {
        duration: 1.3,
        opacity: 1,
        ease: Bounce.easeInOut,
      });
      gsap.to(devTextContainer, {
        duration: 1.3,
        opacity: 1,
        ease: Bounce.easeInOut,
      });
      gsap.to(laptop2ImgRef, {
        duration: 1.3,
        opacity: 1,
        left: 0,
        ease: Power1.easeIn,
        delay: 0.3,
      });
    } else if (section === 2) {
      gsap.to(moonRef, {
        duration: 1.3,
        scale: 1,
        opacity: 1,
        top: 0,
        left: 0,
        ease: Linear.easeIn,
      });
      gsap.to(pianoRef, {
        duration: 1.3,
        opacity: 1,
        left: 0,
        ease: Linear.easeIn,
      });
      gsap.to(musicTextRef, {
        duration: 1.3,
        opacity: 1,
        ease: Linear.easeIn,
        delay: 0.9,
      });
    }
  }, [section]);

  const goToNextContent = () => {
    if (section === 0) {
      gsap.to(".light", {
        duration: 0.7,
        opacity: 0,
        ease: Power2.easeInOut,
      });
      gsap.to(".abstract", {
        duration: 0.7,
        opacity: 0,
        ease: Power2.easeOut,
      });
      gsap.to(laptopImgRef, {
        duration: 0.7,
        left: "-20%",
        opacity: 0,
        delay: 0.5,
        ease: Power2.easeOut,
      });
      setTimeout(() => {
        setSection((state) => (state += 1));
      }, 2000);
    } else if (section === 1) {
      gsap.to(lightRef, {
        duration: 0.7,
        opacity: 0,
        ease: Linear.easeOut,
      });
      gsap.to(devTextContainer, {
        duration: 0.7,
        opacity: 0,
        ease: Linear.easeOut,
      });
      gsap.to(laptop2ImgRef, {
        duration: 0.7,
        opacity: 0,
        left: "-20%",
        ease: Power2.easeOut,
        delay: 0.7,
      });

      setTimeout(() => {
        setSection((state) => (state += 1));
      }, 2000);
    }
  };

  console.log(sections[section]);
  return (
    <div className="aboutContainer">
      {sections[section] === "abstract" && (
        <div className="abstractContainer">
          <Row>
            <Col span={24} offset={1}>
              <div className="light"></div>
            </Col>
          </Row>
          <Row>
            <Col span={16} offset={4}>
              <div className="abstract">
                <h2>Léopold Assogba</h2>
                <p>Hello, welcome to my portfolio..</p>
                <p>
                  I would like to share with you two of my passions: web
                  application development and music.
                </p>
                <p>
                  <Button
                    className="link"
                    type="link"
                    shape="round"
                    onClick={() => goToNextContent()}
                  >
                    More
                    <RightCircleOutlined />
                  </Button>
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="laptop">
                <div ref={(el) => (laptopRevealRef = el)}></div>
                <img
                  src="assets/img/laptop.jpg"
                  alt="laptop"
                  ref={(el) => (laptopImgRef = el)}
                />
              </div>
            </Col>
          </Row>
        </div>
      )}
      {sections[section] === "dev" && (
        <div className="aboutDevContainer">
          <Row>
            <Col span={8}>
              <div className="laptop2Container">
                <img
                  src="assets/img/laptop2.jpg"
                  alt="laptop 2"
                  ref={(el) => (laptop2ImgRef = el)}
                />
              </div>
            </Col>
            <Col span={16}>
              <div className="aboutDev">
                <div className="lightContainer">
                  <img
                    src="assets/img/light2.jpg"
                    alt="leaf "
                    ref={(el) => (lightRef = el)}
                  />
                </div>
                <div
                  className="devTextContainer"
                  ref={(el) => (devTextContainer = el)}
                >
                  <div>
                    <h2>About developpement</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                    <Button
                      onMouseEnter={() => setCursorState("hover")}
                      onMouseLeave={() => setCursorState("notHover")}
                      className="link"
                      type="link"
                      shape="round"
                      onClick={() => goToNextContent()}
                    >
                      More
                      <RightCircleOutlined />
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
      {sections[section] === "music" && (
        <div className="aboutMusicContainer">
          <img
            src="assets/img/moon.jpg"
            alt="moon"
            ref={(el) => (moonRef = el)}
          />
          <Row>
            <Col span={16} offset={4}>
              <div className="pianoContainer">
                <img
                  src="assets/img/piano.jpg"
                  alt="piano"
                  ref={(el) => (pianoRef = el)}
                />
              </div>
              <div
                className="musicTextContainer"
                ref={(el) => (musicTextRef = el)}
              >
                <div>
                  <h2>About Music</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default About;
