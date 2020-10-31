import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "./index.less";
import { useLocation, withRouter } from "react-router-dom";

const isMobile = () => {
  const ua = navigator.userAgent;
  return /Android|Mobi/i.test(ua);
};

const Cursor = ({ history, cursorStateEvent }) => {
  // if (typeof navigator !== "undefined" && isMobile()) return null;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log("cursorStateEvent", cursorStateEvent);

    if (cursorStateEvent === "hover") {
      setLinkHovered(true);
    } else if (cursorStateEvent === "notHover") {
      setLinkHovered(false);
    }

    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
    addEventListeners();
    handleLinkHoverEvents();
    const prevLocation = location.pathname;
    history.listen((location, action) => {
      console.log(action, location.pathname);
      console.log("location", location);
      console.log("prevLocation", prevLocation);
      if (location.pathname === "/") {
        setLinkHovered(false);
      }
      if (prevLocation === "/") {
        setLinkHovered(false);
      }
      addEventListeners();
      handleLinkHoverEvents();

      return removeEventListeners();
    });

    return () => removeEventListeners();
  }, [cursorStateEvent, history, location]);

  // handle redirect
  const onMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const onMouseDown = () => {
    setClicked(true);
  };

  const onMouseUp = () => {
    setClicked(false);
  };

  const onMouseLeave = () => {
    setHidden(true);
  };

  const onMouseEnter = () => {
    setHidden(false);
  };

  const handleLinkHoverEvents = () => {
    document.querySelectorAll(".link").forEach((el) => {
      el.addEventListener("mouseover", () => {
        setLinkHovered(true);
        console.log("hover");
      });
      el.addEventListener("mouseout", () => setLinkHovered(false));
    });
  };

  const cursorClasses = classNames("cursor", {
    "cursor--clicked": clicked,
    "cursor--hidden": hidden,
    "cursor--link-hovered": linkHovered,
  });

  return (
    <div
      className={cursorClasses}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

export default withRouter(Cursor);
