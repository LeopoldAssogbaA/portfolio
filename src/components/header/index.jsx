import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";

import "./index.less";
import history from "../../constants/history";

const Header = () => {
  let headerRef = useRef(null);
  let menuRef = useRef(null);
  let fireRef = useRef(null);

  useEffect(() => {
    gsap.from(headerRef, { visibility: "hidden", duration: 0 });
    gsap.from(fireRef, { opacity: 0, delay: 0.7, duration: 1.5 });
    gsap.from(menuRef, { opacity: 0, right: "-10%", delay: 0.1 });
    gsap.from(".about", { transform: "rotateX(85deg)", delay: 0.2 });
    gsap.from(".contact", { transform: "rotateX(85deg)", delay: 0.3 });
    gsap.from(".git", { transform: "rotateX(85deg)", delay: 0.4 });
    gsap.from(".dev", { transform: "rotateX(85deg)", delay: 0.5 });
    gsap.from(".music", { transform: "rotateX(85deg)", delay: 0.6 });
  }, []);

  const navigate = (page) => {
    history.push(page);
  };

  return (
    <div className="header" ref={(el) => (headerRef = el)}>
      <div className="fireContainer" ref={(el) => (fireRef = el)}>
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
        <NavLink to="/about" activeClassName="active" className="link">
          About
        </NavLink>
        <NavLink to="/contact" activeClassName="active" className="link">
          Contact
        </NavLink>
        <NavLink to="/git" activeClassName="active" className="link">
          Git
        </NavLink>
        <NavLink to="/dev" activeClassName="active" className="link">
          Dev
        </NavLink>
        <NavLink to="/music" activeClassName="active" className="link">
          Music
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
