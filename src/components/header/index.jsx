import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";

import history from "../../constants/history";
import "./index.less";
import { TimelineLite } from "gsap/gsap-core";
import { Power1 } from "gsap/gsap-core";
import { Power2 } from "gsap/gsap-core";

import { PauseCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Header = ({ pausePlayer, player }) => {
  let headerRef = useRef(null);
  let menuRef = useRef(null);
  let fireRef = useRef(null);

  useEffect(() => {
    gsap.from(headerRef, { visibility: "hidden", duration: 0 });
    gsap.from(fireRef, { opacity: 0, delay: 0.7, duration: 1 });
    gsap.from(menuRef, {
      opacity: 0,
      right: "-10%",
      delay: 0.1,
      ease: Power1.easeOut,
    });
    const tl = new TimelineLite();
    tl.staggerTo(
      ".menuContainer a",
      1,
      {
        marginLeft: 0,
        ease: Power2.easeOut,
        delay: 0.3,
      },
      0.3
    );
  }, []);

  const navigate = (page) => {
    history.push(page);
  };

  console.log("player", player);

  return (
    <div className="header" ref={(el) => (headerRef = el)}>
      <div className="fireContainer link" ref={(el) => (fireRef = el)}>
        <div className="fireHover" onClick={() => navigate("/")}>
          <div className="fire-left">
            <div className="main-fire"></div>
            <div className="particle-fire"></div>
          </div>
          <div className="fire-main">
            <div className="main-fire"></div>
            <div className="particle-fire"></div>
          </div>
          <div className="fire-right">
            <div className="main-fire"></div>
            <div className="particle-fire"></div>
          </div>
          <div className="fire-bottom">
            <div className="main-fire"></div>
          </div>
        </div>
      </div>

      <div className="menuContainer" ref={(el) => (menuRef = el)}>
        <NavLink to="/about" activeClassName="active" className="link about">
          About
        </NavLink>
        <NavLink
          to="/contact"
          activeClassName="active"
          className="link contact"
        >
          Contact
        </NavLink>
        <NavLink to="/git" activeClassName="active" className="link git">
          Git
        </NavLink>
        <NavLink to="/dev" activeClassName="active" className="link dev">
          Dev
        </NavLink>
        <NavLink to="/music" activeClassName="active" className="link music">
          Music
        </NavLink>
        {player !== null && player !== undefined && (
          <Button
            className="link"
            type="link"
            style={{ position: "absolute", right: "-1em", top: "3em" }}
            onClick={() => pausePlayer()}
            icon={
              <PauseCircleOutlined
                style={{
                  fontSize: "1em",
                }}
              />
            }
          />
        )}
      </div>
    </div>
  );
};

export default Header;
