import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";

import history from "../../constants/history";
import "./index.less";
import { TimelineLite } from "gsap/gsap-core";
import { Linear } from "gsap/gsap-core";

const Header = () => {
  let headerRef = useRef(null);
  let menuRef = useRef(null);
  let fireRef = useRef(null);

  useEffect(() => {
    gsap.from(headerRef, { visibility: "hidden", duration: 0 });
    gsap.from(fireRef, { opacity: 0, delay: 0.7, duration: 1.5 });
    gsap.from(menuRef, { opacity: 0, right: "-10%", delay: 0.1 });
    const tl = new TimelineLite();
    tl.staggerTo(
      ".menuContainer a",
      0.5,
      {
        marginLeft: 0,
        ease: Linear.easeIn,
      },
      0.1
    );
  }, []);

  const navigate = (page) => {
    history.push(page);
  };

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
      </div>
    </div>
  );
};

export default Header;
