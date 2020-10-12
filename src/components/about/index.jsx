import { Button, Col, Row } from "antd";
import React, { useEffect, useRef } from "react";
import gsap, { TimelineLite, Power2, Bounce } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

import { RightCircleOutlined } from "@ant-design/icons";

import "./index.less";

// TODO: transition when page quit

const About = () => {
  gsap.registerPlugin(CSSRulePlugin);
  let laptopContainerRef = useRef(null);
  let laptopRevealRef = useRef(null);
  let laptopImgRef = useRef(null);

  useEffect(() => {
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
  }, []);

  const goToNextContent = () => {
    gsap.to(".light", {
      duration: 1,
      opacity: 0,
      ease: Power2.easeInOut,
    });
    gsap.to(".abstract", {
      duration: 1,
      opacity: 0,
      ease: Power2.easeOut,
    });
    gsap.to(laptopImgRef, {
      duration: 1,
      position: "absolute",
      left: "-20%",
      opacity: 0,
      delay: 1,
      ease: Power2.easeOut,
    });
  };

  return (
    <div className="aboutContainer">
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
            <div className="laptop" ref={(el) => (laptopContainerRef = el)}>
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
    </div>
  );
};

export default About;
