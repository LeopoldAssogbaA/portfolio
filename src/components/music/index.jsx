import gsap, { Linear, TimelineLite } from "gsap";
import {
  Elastic,
  Power4,
  Power1,
  Power3,
  Power0,
  Power2,
  Back,
} from "gsap/gsap-core";
import { Draggable } from "gsap/Draggable";

import React, { useEffect, useRef, useState } from "react";
import SC from "soundcloud";
import "./index.less";
import { Col, Row } from "antd";
import Equalizer from "./equalizer";

// TODO: enhance page animation

export const Music = () => {
  let circleDraggerRef = useRef(null);
  let armGroupRef = useRef(null);
  let draggerRef = useRef(null);

  useEffect(() => {
    var xmlns = "http://www.w3.org/2000/svg",
      select = function (s) {
        return document.querySelector(s);
      },
      selectAll = function (s) {
        return document.querySelectorAll(s);
      },
      container = select(".container"),
      searchSVG = select(".searchSVG"),
      vinylSVG = select(".vinylSVG"),
      imageContainer = select("#image-container"),
      previewContainer = select("#preview-container"),
      vinylTitle = select("#vinylTitle"),
      scPlayer,
      vinylStartRotation = 31,
      vinylEndRotation = 53,
      vinylRotationScale = vinylEndRotation - vinylStartRotation,
      trackDuration,
      stylusDragger,
      currentState,
      needle_down = new Audio(
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/vinyl_needle_down_edit.mp3"
      );

    //center the container cos it's pretty an' that
    // gsap.to(container, {
    //   position: "absolute",
    //   top: "0%",
    //   left: "50%",
    //   xPercent: -50,
    //   yPercent: 0,
    // });
    gsap.to("svg", {
      visibility: "visible",
    });
    // gsap.to(vinylSVG, {
    //   y: -110,
    //   x: 80,
    // });

    // ----SOUNDCLOUD TEST API---- //
    SC.initialize({
      client_id: "516b790a82b7c6d89856376fa4ced361",
      redirect_uri: "https://storymore.com/soundcloud/",
    });
    SC.get("/users/179508571/tracks").then((e) => console.log("groovehill", e));
    SC.stream("/tracks/438769461").then(function (player) {
      // player.play();
    });
    // ----SOUNDCLOUD TEST API---- //

    function getTracks(query) {
      if (!query) {
        return;
      }

      SC.get("/tracks", {
        q: query,
        limit: 10,
      }).then(function (tracks) {
        createTracks(tracks);
        //console.log()
        streamTrack(null, tracks[0]);
      });

      gsap.to("#preview-container", {
        visibility: "visible",
      });

      gsap.to("#searchIconGroup", {
        visibility: "visible",
      });

      tl.play(0);
    }

    gsap.to(["#vinylShine1", "#vinylShine2", "#vinylShine3"], {
      drawSVG: "30% 30%",
    });
    gsap.to(armGroupRef, {
      //rotation:33,
      svgOrigin: "396.5 188",
    });

    gsap.to([circleDraggerRef], {
      svgOrigin: "396.5 188",
    });

    gsap.to("#vinylShineGroup", {
      //svgOrigin:'284 320'
      transformOrigin: "50% 50%",
    });

    var tl = new TimelineLite({ paused: true });
    tl.fromTo(
      "#arm",
      1,
      {
        drawSVG: "0% 0%",
      },
      {
        drawSVG: "0% 13%",
        ease: Power1.easeOut,
      }
    )
      .from(
        "#balance",
        1,
        {
          attr: {
            r: 0,
          },
          ease: Power0.easeIn,
        },
        "-=1"
      )
      .to(
        "#arm",
        2,
        {
          drawSVG: "0% 100%",
          ease: Power4.easeInOut,
        },
        "-=0.5"
      )
      .from(
        "#stylus",
        1,
        {
          scale: 0,
          transformOrigin: "75% 15%",
          ease: Power2.easeInOut,
        },
        "-=0.9"
      )
      .staggerFrom(
        "#vinylGroup circle",
        2,
        {
          //x:'-=100',
          attr: {
            r: 0,
          },
          ease: Elastic.easeOut.config(1, 0.82),
        },
        0.46,
        "-=0.6"
      )
      .from(
        "#titleGroup",
        0.5,
        {
          scale: 0.8,
          alpha: 0,
          //rotation:-45,
          transformOrigin: "50% 50%", //,
          ease: Elastic.easeOut.config(1, 0.82),
        },
        "-=2.6"
      );

    tl.timeScale(1.2);

    var vinylShineTl = new TimelineLite({ paused: true });
    vinylShineTl
      .to(["#vinylShine1", "#vinylShine2", "#vinylShine3"], 1.4, {
        drawSVG: "65% 78%",
        ease: Linear.easeNone,
      })
      .to(
        ["#vinylShineGroup"],
        3.3,
        {
          rotation: "+=360",
          repeat: -1,
          yoyo: false,
          transformOrigin: "50% 50%",
          ease: Linear.easeNone,
        },
        "-=1.4"
      );

    function onDrag(e) {
      gsap.to(armGroupRef, {
        rotation: circleDraggerRef._gsTransform.rotation,
      });
    }

    function onPress() {
      if (trackDuration) {
        scPlayer.pause();
        setSylusHold();
        needle_down.pause();
        needle_down.currentTime = 0;
      }
    }

    function onRelease(e) {
      //return stylus to off position
      if (circleDraggerRef._gsTransform.rotation < vinylStartRotation) {
        gsap.to([armGroupRef], 0.3, {
          rotation: 0,
          ease: Back.easeOut.config(0.6),
        });
        gsap.to(circleDraggerRef, {
          rotation: 0,
        });

        stopVinyl();

        scPlayer.pause();

        setSylusDropped();

        return;
      }

      console.log(scPlayer.currentTime());
      needle_down.play();
      if (scPlayer.currentTime() > 0) {
        needle_down.play();
        //needle_down.loop = true;

        var headDragPercent =
          (circleDraggerRef._gsTransform.rotation - vinylStartRotation) /
          vinylRotationScale;

        console.log("headDragPercent: " + headDragPercent * trackDuration);
        scPlayer.play();
        scPlayer.seek(headDragPercent * trackDuration);
        playVinyl();
        setSylusDropped();

        return;
      }
      //console.log(circleDragger._gsTransform.rotation)
      //put the needle on the reckid
      if (circleDraggerRef._gsTransform.rotation >= vinylStartRotation) {
        needle_down.play();
        //needle_down.loop = true;
        scPlayer.play();

        gsap.to(armGroupRef, 0.3, {
          rotation: vinylStartRotation,
          ease: Back.easeOut.config(0.6),
        });

        gsap.to(circleDraggerRef, {
          rotation: vinylStartRotation,
        });

        playVinyl();

        setSylusDropped();
      }
      stylusDragger[0].vars.bounds.max = vinylEndRotation;
      stylusDragger[0].applyBounds();
    }

    function setSylusDropped() {
      gsap.to(armGroupRef, 0.2, {
        scaleY: 1,
        ease: Back.easeOut.config(2),
      });
    }

    function setSylusHold() {
      gsap.to(armGroupRef, 0.2, {
        scaleY: 0.98,
        ease: Back.easeOut.config(0.3),
      });
    }

    function playVinyl() {
      //console.log(playTrackTl.duration())
      //
      //console.log(vinylShineTl.paused())
      if (vinylShineTl.paused()) {
        vinylShineTl.resume();
      } else {
      }
    }

    function stopVinyl() {
      vinylShineTl.pause();
      gsap.to(["#vinylShine1", "#vinylShine2", "#vinylShine3"], 1, {
        drawSVG: "100% 100%",
        ease: Linear.easeNone,
        onComplete: function () {
          //vinylShineTl.pause(0);
          gsap.to(["#vinylShine1", "#vinylShine2", "#vinylShine3"], {
            drawSVG: "30% 30%",
          });
        },
      });
      gsap.to(["#vinylShineGroup"], 1, {
        rotation: "+=45",
        ease: Power1.easeOut,
      });

      needle_down.pause();
      needle_down.currentTime = 0;
    }

    function endTrack(e) {
      //alert('endTrack')
      gsap.to([circleDraggerRef, armGroupRef], 2, {
        rotation: 0,
        ease: Back.easeOut.config(0.3),
      });

      stopVinyl();
    }

    function updateDragger() {
      var trackTimePercent = scPlayer.currentTime() / trackDuration;
      gsap.to([circleDraggerRef, armGroupRef], {
        rotation: vinylStartRotation + trackTimePercent * vinylRotationScale,
        ease: Linear.easeNone,
      });
    }

    function createTracks(tracks) {
      for (var i = 0; i < tracks.length; i++) {
        //console.log(tracks[i].title)
        var img = document.createElement("img");
        var a = document.createElement("a");
        img.className = "thumb";
        if (tracks[i].artwork_url) {
          img.setAttribute("src", tracks[i].artwork_url);
        } else {
          img.setAttribute("src", tracks[i].user.avatar_url);
        }

        img.setAttribute("title", tracks[i].title);
        img.setAttribute("width", 70);
        img.setAttribute("height", 70);
        img.trackInfo = tracks[i];
        a.setAttribute("href", "#");
        a.appendChild(img);
        imageContainer.appendChild(a);
      }

      gsap.staggerFrom(
        "#image-container img",
        1,
        {
          scale: 0,
          delay: 1.5,
          borderRadius: "50%",
          transformOrigin: "50% 50%",
        },
        0.1
      );
    }

    function streamTrack(e, trackInfo) {
      SC.stream("/tracks/" + trackInfo.id).then(function (player) {
        player.play();
        if (player.options.protocols[0] === "rtmp") {
          player.options.protocols.splice(0, 1);
        }
        scPlayer = player;
        console.log(player);
        //console.log(trackInfo.permalink_url)
        vinylTitle.textContent = trackInfo.title;
        select("#preview-container a").href = trackInfo.permalink_url;
        select("#preview-container a").title = trackInfo.title;
        select("#preview-container a").alt = trackInfo.title;
        select("#preview-container img").src = trackInfo.artwork_url
          ? trackInfo.artwork_url
          : trackInfo.user.avatar_url;
        select("#preview-container p").innerHTML = trackInfo.title;

        trackDuration = scPlayer.options.duration;
        player.on("time", function () {
          updateDragger();
        });
        player.on("finish", function () {
          endTrack();
        });
        player.on("state-change", function (state) {
          currentState = state;
          console.log(state);

          if (state === "idle") {
            needle_down.play();
          }
        });
      });
      stylusDragger[0].vars.bounds.max = vinylStartRotation;
      stylusDragger[0].applyBounds();
    }

    document.body.addEventListener("click", function (e) {
      var t = e.target;
      console.log(trackDuration);
      if (!trackDuration) {
        //return
      }
      //console.log(e.target.className === 'thumb')
      if (t.className === "thumb") {
        stylusDragger();
        scPlayer.pause();
        setSylusHold();
        stopVinyl();
        endTrack();

        streamTrack(e, t.trackInfo);
        console.log(e);
        console.log(t);
      }

      //console.log(t.id)
      if (t.id === "show") {
        //console.log(select('#search-field').value)
        select("#preview-container p").innerHTML = "";
        select("#preview-container img").src =
          "https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/blank.png";
        select("#image-container").innerHTML = "";
        select("#search-field").value = "";
        select("#search-field").focus();

        gsap.to("#preview-container", {
          visibility: "hidden",
        });
        gsap.to(searchSVG, 1, {
          x: 190,
          y: 120,
          scale: 1,
          transformOrigin: "50% 50%",
          ease: Power3.easeInOut,
        });

        gsap.to("#searchIcon circle", 1, {
          stroke: "#FFF",
        });
        gsap.to("#searchIcon path", 1, {
          fill: "#FFF",
        });

        scPlayer.pause();
        tl.time(0);
        tl.pause();
        vinylShineTl.time(0);
        vinylShineTl.pause();
        needle_down.pause();
        needle_down.currentTime = 0;
        select("#search-field").focus();

        t.id = "go";
        gsap.to(".scLogo", {
          autoAlpha: 1,
        });
        return;
      }

      if (t.id === "go") {
        console.log(select("#search-field").value);
        getTracks(select("#search-field").value);

        t.id = "show";
        return;
      }

      /*  if(t.id === "searchIconGroup"){
    
    //console.log(select('#search-field').value)
    TweenMax.to('.search-box', {
      visibility:'visible'
    })
    TweenMax.to('#searchIconGroup', {
      visibility:'hidden'
    })    
  }*/
    });

    function createDragger() {
      stylusDragger = null;

      stylusDragger = Draggable.create(circleDraggerRef, {
        type: "rotation",
        trigger: draggerRef,
        cursor: "pointer",
        bounds: { min: 0, max: vinylStartRotation },
        onDrag: onDrag,
        onRelease: onRelease,
        onPress: onPress,
      });
    }

    document.body.onkeypress = function (e) {
      if (e.charCode === 13) {
        getTracks(select("#search-field").value);
        select("#go").id = "show";
      }
    };
    //select('#search-field').focus();
    // createDragger();
    //ScrubGSAPTimeline(tl)
    getTracks("groove hill better world");
  }, []);

  return (
    <div className="musicContainer">
      {/* <Equalizer /> */}
      <Row>
        <Col span={10} offset={1}>
          <div className="bandContainer">
            <div className="pictureContainer">
              <img src="assets/img/ghdrum.jpg" alt="groove hill" />
            </div>
            <div className="infosContainer">
              <h2>Groove Hill</h2>
              <h3>Hip hop - Soul - Funk</h3>
              <p>
                An eclectic mix of musical genres, Groove Hill draws much
                inspiration from African-American music. Having grown up during
                the same times, the five musicians have channelled different
                inspirations into a modern fusion of soul, jazz, funk and hip
                hop. Their desire to create a unique and original sound drew
                them together. Social and ethical themes dominate their lyrics,
                sung in English, and delivered by a passionate singer. The soft
                tones of the trombone and catchy groove rhythms form the band's
                signature sound, with samples featuring at times.
              </p>
            </div>
            <div className="tracksContainer">
              <div id="image-container" />
            </div>
          </div>
        </Col>
        <Col span={10} offset={1}>
          <Row justify="center" direction="column" style={{ height: "100%" }}>
            <div className="container">
              <svg
                className="vinylSVG"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlna="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                viewBox="0 0 600 600"
                enableBackground="new 0 0 600 900"
                xmlSpace="preserve"
                style={{
                  background: "radial-gradient(closest-side, #C67D30, black)",
                }}
              >
                <defs>
                  <path
                    id="titlePath"
                    fill="none"
                    stroke="#FF0049"
                    strokeMiterlimit={10}
                    d="M284,346.5c-14.6,0-26.5-11.9-26.5-26.5
		c0-14.6,11.9-26.5,26.5-26.5s26.5,11.9,26.5,26.5C310.5,334.6,298.6,346.5,284,346.5z"
                  />
                </defs>
                <g id="vinylGroup">
                  <circle
                    id="vinylMain"
                    fill="#2A2525"
                    cx={284}
                    cy={320}
                    r={121}
                  />
                  <circle
                    id="vinylStart"
                    fill="#262121"
                    cx={284}
                    cy={320}
                    r={117}
                  />
                  <circle
                    id="vinylEnd"
                    fill="#2A2525"
                    cx={284}
                    cy={320}
                    r={50}
                  />
                  <circle
                    id="vinylLabel"
                    fill="#FF5F00"
                    cx={284}
                    cy={320}
                    r="40.8"
                  />
                  <circle
                    id="vinylInner"
                    fill="#FF914F"
                    cx={284}
                    cy={320}
                    r={17}
                  />
                  <circle
                    id="vinylHole"
                    fill="#eff2e1"
                    cx={284}
                    cy={320}
                    r="2.5"
                  />
                </g>
                <g
                  id="vinylShineGroup"
                  stroke="#403737"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle
                    id="vinylShine1"
                    opacity="0.3"
                    fill="none"
                    cx={284}
                    cy={320}
                    r={103}
                  />
                  <circle
                    id="vinylShine2"
                    opacity="0.3"
                    fill="none"
                    cx={284}
                    cy={320}
                    r={91}
                  />
                  <circle
                    id="vinylShine3"
                    opacity="0.3"
                    fill="none"
                    cx={284}
                    cy={320}
                    r={60}
                  />
                  <g id="titleGroup" stroke="none" opacity={1}>
                    <text>
                      <textPath id="vinylTitle" xlinkHref="#titlePath">
                        -
                      </textPath>
                    </text>
                  </g>
                </g>
                <g id="armGroup" ref={(el) => (armGroupRef = el)}>
                  <path
                    id="arm"
                    fill="none"
                    stroke="#9F978D"
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeMiterlimit={10}
                    d="M398.5,159v29c0,0-5.7,11.2-6.4,15.2
		s-4.3,16.2,7.6,30.1s81.7,93.9,85.5,99.4c3.7,5.5,5.1,8.7,3.4,20.2"
                  />
                  <circle
                    id="balance"
                    fill="#CCCBCB"
                    cx="396.5"
                    cy={188}
                    r={19}
                  />
                  <path
                    id="stylus"
                    fill="#18110E"
                    d="M489.9,367.5l-11.5-1.1c-2.2-0.2-3.8-2.2-3.6-4.4l1.5-15.9c0.2-2.2,2.2-3.8,4.4-3.6
		l11.5,1.1c2.2,0.2,3.8,2.2,3.6,4.4l-1.5,15.9C494,366.1,492.1,367.7,489.9,367.5z"
                  />
                </g>
                <g
                  id="circleDragger"
                  opacity={0}
                  ref={(el) => (circleDraggerRef = el)}
                >
                  <circle
                    cx="396.5"
                    cy={188}
                    r={190}
                    fill="rgba(89,89,89,0.2)"
                    stroke="red"
                  />
                  <rect
                    id="dragger"
                    x={472}
                    y={338}
                    fill="#EF2572"
                    width={26}
                    height={36}
                    opacity={1}
                    ref={(el) => (draggerRef = el)}
                  />
                </g>
              </svg>
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Music;
