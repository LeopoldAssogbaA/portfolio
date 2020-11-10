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
      gsap.to(".aboutContainer", {
        duration: 0,
        visibility: "visible",
      });
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
        marginTop: 0,
        right: 0,
        ease: Linear.easeIn,
      });
      gsap.to(pianoRef, {
        duration: 1.3,
        opacity: 1,
        width: "80%",
        left: 0,
        delay: 0.8,
        ease: Linear.easeIn,
      });
      gsap.to(musicTextRef, {
        duration: 1.3,
        opacity: 1,
        ease: Linear.easeIn,
        delay: 1.3,
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
  // xs | sm | md | lg | xl | xxl
  const lightLayout = {
    span: 23,
    offset: 1,
  };

  const laptopLayout = {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 4 },
    lg: { span: 8 },
  };
  const devTextLayout = {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 20 },
    lg: { span: 16 },
  };
  const musicLayout = {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 16, offset: 4 },
    lg: { span: 16, offset: 4 },
  };

  return (
    <div className="aboutContainer">
      {sections[section] === "abstract" && (
        <div className="abstractContainer">
          <Row>
            <Col {...lightLayout}>
              <div className="light"></div>
            </Col>
          </Row>
          <Row>
            <Col span={16} offset={4}>
              <div className="abstract">
                <h2>Léopold Assogba</h2>
                <p>Welcome to my portfolio</p>
                <p>
                  I'm a web application developer and drummer. You will discover
                  here a part of my projects.
                </p>
                <p>
                  <Button
                    className="link"
                    type="link"
                    shape="round"
                    onClick={() => goToNextContent()}
                    icon={
                      <RightCircleOutlined
                      // style={{
                      //   fontSize: "2em",
                      // }}
                      />
                    }
                  />
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
            <Col {...laptopLayout}>
              <div className="laptop2Container">
                <img
                  src="assets/img/laptop2.jpg"
                  alt="laptop 2"
                  ref={(el) => (laptop2ImgRef = el)}
                />
              </div>
            </Col>
            <Col {...devTextLayout}>
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
                      After a professional reconversion at the end of 2017, I
                      followed two training courses in order to enhance my
                      skills with state-recognized diplomas. Based in Lyon, a
                      digital city, I continue to train with the same passion
                      for web technologies.
                    </p>
                    <p>
                      <i>
                        Any sufficiently advanced technology is
                        indistinguishable from magic.
                      </i>
                    </p>
                    <p>
                      <b>Gregory Benford</b>
                    </p>
                    <div className="btnContainer">
                      <Button
                        onMouseEnter={() => setCursorState("hover")}
                        onMouseLeave={() => setCursorState("notHover")}
                        className="link"
                        type="link"
                        shape="round"
                        onClick={() => goToNextContent()}
                        icon={
                          <RightCircleOutlined
                          // style={{
                          //   fontSize: "2em",
                          // }}
                          />
                        }
                      />
                    </div>
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
            <div className="pianoContainer">
              <img
                src="assets/img/piano.jpg"
                alt="piano"
                ref={(el) => (pianoRef = el)}
              />
            </div>
            <Col {...musicLayout}>
              <div
                className="musicTextContainer"
                ref={(el) => (musicTextRef = el)}
              >
                <div>
                  <h2>About Music</h2>
                  <p>
                    Falling into music as a child, I started playing in bands in
                    college, professionalizing the projects more and more. In
                    Dijon I was able to participate in several projects before
                    leaving them in 2019. Inspired by many influences, from
                    bethoveen to miles davis through kendrick lamar, I try to
                    bring my energy to the songs I help shape.
                  </p>
                  <p>
                    <i>
                      Je ferais de sorte pour demontrer. Que la musique nourrit
                      le monde.
                    </i>
                  </p>
                  <p>
                    <b>Gnonnas Pedro</b>
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
