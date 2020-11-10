/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import gsap, { Power2, TimelineLite } from "gsap/gsap-core";
import classnames from "classnames";
import { Button, Col, Row, Tooltip, Grid } from "antd";
import {
  LeftCircleOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import SC from "soundcloud";

import Equalizer from "./equalizer";

import musicProjects from "../../constants/musicProjects";

import "./index.less";
import { withRouter } from "react-router-dom";

const { useBreakpoint } = Grid;

export const Music = ({
  setCursorState,
  history,
  registerPlayer,
  registerTrack,
  prevPlayer,
  track,
}) => {
  const screens = useBreakpoint();
  const [bands, setBands] = useState([]);
  const [bandsLoaded, setBandsLoaded] = useState(false);
  const [bandRequeted, setBandRequeted] = useState(false);
  const [tracksLoaded, setTracksLoaded] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [bandIndex, setBandIndex] = useState(0);
  const [vinylPlaying, setVinylPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [displayPlay, setDisplayPlay] = useState(null);
  const [animationDone, setAnimationDone] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [needleD, setNeedleD] = useState(
    new Audio(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/vinyl_needle_down_edit.mp3"
    )
  );
  const needle_up = new Audio("assets/sounds/needle-up.mp3");

  useEffect(() => {
    if (prevPlayer !== null && track !== null) {
      // console.log("prevPlayer", prevPlayer);
      // console.log("track", track);
      setPlayer(prevPlayer);
      setBandIndex(track.bandIndex);
      setCurrentTrackIndex(track.trackIndex);
      setTimeout(() => {
        setVinylPlaying(true);
        setDisplayPlay(track.trackIndex);
      }, 1100);
    }
  }, [prevPlayer, track]);

  // ANIMATIONS --------------------------------------------

  useEffect(() => {
    if (tracksLoaded && !animationDone) {
      // console.log("animationStart");
      gsap.to(".disco", {
        duration: 1,
        opacity: 1,
        top: "50%",
      });
      gsap.to(".bandImg", {
        duration: 0.5,
        delay: 1,
        maskImage:
          "radial-gradient(closest-side,rgba(0, 0, 0, 1),rgba(0, 0, 0, 0))",
      });
      gsap.to(".bandNameReveal", {
        duration: 0.8,
        width: 0,
        delay: 1.2,
        ease: Power2.easeOut,
      });
      gsap.to(".genreReveal", {
        duration: 0.8,
        width: 0,
        delay: 1.4,
        ease: Power2.easeOut,
      });
      gsap.to(".descriptionReveal", {
        duration: 0.8,
        width: 0,
        delay: 1.6,
        ease: Power2.easeOut,
      });
      gsap.from(".anticon", { opacity: 0, delay: 1.8, duration: 0.5 });

      const tl = new TimelineLite({
        onComplete: () => {
          setAnimationDone(true);
          // console.log("animationDone");
        },
      });

      tl.staggerTo(
        "#image-container img",
        0.5,
        {
          scale: 1,
          delay: 1.8,
          borderRadius: "50%",
          transformOrigin: "50% 50%",
        },
        0.1
      );
      tl.staggerTo(
        ".arrowsContainer svg",
        0.5,
        {
          opacity: 1,
          scale: 1,
          borderRadius: "50%",
          transformOrigin: "50% 50%",
        },
        0.1
      );
    }
  });

  // DATAS ----------------------------------------------

  useEffect(() => {
    SC.initialize({
      client_id: "516b790a82b7c6d89856376fa4ced361",
      redirect_uri: "https://storymore.com/soundcloud/",
    });

    const getBands = () => {
      setBandRequeted(true);
      const bandsIds = ["179508571", "284443809"];
      const bandsUpdated = [];
      const bandsWithTracks = [];
      for (let i = 0; i < bandsIds.length; i++) {
        SC.get(`/users/${bandsIds[i]}`).then((band) => {
          // console.log("loadBand");
          bandsUpdated.push(band);
          // if all bands loaded load tracks
          if (bandsUpdated.length === bandsIds.length) {
            for (let i = 0; i < bandsUpdated.length; i++) {
              SC.get(`/users/${bandsUpdated[i].id}/tracks`).then((tracks) => {
                let bandIndex = bandsUpdated.findIndex(
                  (band) => band.id === tracks[0].user.id
                );
                const bandUpdated = { ...bandsUpdated[bandIndex], tracks };
                bandsWithTracks.push(bandUpdated);
                // set bands
                if (bandsWithTracks.length === bandsIds.length) {
                  const GHIndex = bandsWithTracks.findIndex(
                    (band) => band.id === 179508571
                  );
                  // reorder bands
                  if (GHIndex !== 0) {
                    const bandsReordered = [];
                    bandsReordered.push(
                      bandsWithTracks[GHIndex],
                      bandsWithTracks[0]
                    );
                    setBands(bandsReordered);
                    setBandsLoaded(true);
                    setTracksLoaded(true);
                  } else {
                    setBands(bandsWithTracks);
                    setBandsLoaded(true);
                    setTracksLoaded(true);
                  }
                }
              });
            }
          }
        });
      }
    };

    !bandsLoaded && !bandRequeted && getBands();
  }, [bandRequeted, bands, bandsLoaded]);

  const stream = (trackId) => {
    const trackIndex = bands[bandIndex].tracks.findIndex(
      (track) => track.id === trackId
    );

    if (vinylPlaying) {
      if (trackIndex === currentTrackIndex) {
        needleD.pause();
        needle_up.play();
        player.pause();
        registerPlayer(null);
        setVinylPlaying(false);
      } else {
        needle_up.play();
        needleD.pause();
        player.pause();
        registerPlayer(null);
        setVinylPlaying(false);
        setTimeout(() => {
          gsap.to(".disco", { duration: 1, opacity: 0, top: 0 });
        }, 200);
        SC.stream("/tracks/" + trackId).then((p) => {
          setTimeout(() => {
            gsap.to(".disco", { duration: 0, opacity: 0, top: "100%" });
            gsap.to(".disco", { duration: 1, opacity: 1, top: "50%" });
          }, 2000);
          setTimeout(() => {
            needleD.play();
            p.play();
            registerPlayer(p);
            registerTrack(currentTrackIndex, bandIndex);
            setPlayer(p);
            setVinylPlaying(true);
            setCurrentTrackIndex(trackIndex);
          }, 4000);
        });
      }
    } else {
      if (trackIndex === currentTrackIndex) {
        SC.stream("/tracks/" + trackId).then((p) => {
          needleD.play();
          p.play();
          registerPlayer(p);
          registerTrack(currentTrackIndex, bandIndex);
          setPlayer(p);
          setVinylPlaying(true);
          setCurrentTrackIndex(trackIndex);
        });
      } else {
        setTimeout(() => {
          gsap.to(".disco", { duration: 1, opacity: 0, top: 0 });
        }, 200);
        SC.stream("/tracks/" + trackId).then((p) => {
          setTimeout(() => {
            gsap.to(".disco", { duration: 0, opacity: 0, top: "100%" });
            gsap.to(".disco", { duration: 1, opacity: 1, top: "50%" });
          }, 2000);
          setTimeout(() => {
            needleD.play();
            p.play();
            registerPlayer(p);
            registerTrack(currentTrackIndex, bandIndex);
            setPlayer(p);
            setVinylPlaying(true);
            setCurrentTrackIndex(trackIndex);
          }, 4000);
        });
      }
    }
  };

  const prevProject = async () => {
    if (vinylPlaying) {
      player.pause();
      registerPlayer(null);
      needle_up.play();
      needleD.pause();
      await setVinylPlaying(false);
    }
    gsap.to(".disco", {
      duration: 1,
      opacity: 0,
      left: "100%",
      onComplete: () => {
        gsap.to(".disco", {
          opacity: 0,
          left: "50%",
          top: "100%",
        });
      },
    });
    gsap.to(".bandImg", {
      duration: 0.5,
      delay: 0.5,
      maskImage:
        "radial-gradient(closest-side,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0))",
    });
    gsap.to(".bandNameReveal", {
      duration: 0.8,
      width: "100%",
      delay: 0.2,
      ease: Power2.easeIn,
    });
    gsap.to(".genreReveal", {
      duration: 0.8,
      width: "100%",
      delay: 0.4,
      ease: Power2.easeIn,
    });
    gsap.to(".descriptionReveal", {
      duration: 0.8,
      width: "100%",
      delay: 0.6,
      ease: Power2.easeIn,
    });

    const tl = new TimelineLite();

    tl.staggerTo(
      "#image-container img",
      0.5,
      {
        scale: 0,
        delay: 0.8,
        borderRadius: "50%",
        transformOrigin: "50% 50%",
      },
      0.1
    );

    tl.staggerTo(
      ".arrowsContainer svg",
      0.3,
      {
        opacity: 1,
        scale: 0,
        borderRadius: "50%",
        transformOrigin: "50% 50%",
      },
      0.1
    );

    if (bandIndex === 0) {
      setTimeout(() => {
        setBandIndex(musicProjects.length - 1);
        setCurrentTrackIndex(0);

        gsap.to(".disco", {
          duration: 1,
          opacity: 1,
          top: "50%",
        });
        gsap.to(".bandImg", {
          duration: 0.5,
          delay: 1,
          maskImage:
            "radial-gradient(closest-side,rgba(0, 0, 0, 1),rgba(0, 0, 0, 0))",
        });
        gsap.to(".bandNameReveal", {
          duration: 0.8,
          width: 0,
          delay: 1.2,
          ease: Power2.easeOut,
        });
        gsap.to(".genreReveal", {
          duration: 0.8,
          width: 0,
          delay: 1.4,
          ease: Power2.easeOut,
        });
        gsap.to(".descriptionReveal", {
          duration: 0.8,
          width: 0,
          delay: 1.6,
          ease: Power2.easeOut,
        });
        tl.staggerTo(
          "#image-container img",
          0.5,
          {
            scale: 1,
            delay: 1.8,
            borderRadius: "50%",
            transformOrigin: "50% 50%",
          },
          0.1
        );
        tl.staggerTo(
          ".arrowsContainer svg",
          0.5,
          {
            opacity: 1,
            scale: 1,
            borderRadius: "50%",
            transformOrigin: "50% 50%",
          },
          0.1
        );
      }, 2100);
    } else {
      setTimeout(() => {
        setBandIndex((state) => (state -= 1));
        setCurrentTrackIndex(0);
        gsap.to(".disco", {
          duration: 1,
          opacity: 1,
          top: "50%",
        });
        gsap.to(".bandImg", {
          duration: 0.5,
          delay: 1,
          maskImage:
            "radial-gradient(closest-side,rgba(0, 0, 0, 1),rgba(0, 0, 0, 0))",
        });
        gsap.to(".bandNameReveal", {
          duration: 0.8,
          width: 0,
          delay: 1.2,
          ease: Power2.easeOut,
        });
        gsap.to(".genreReveal", {
          duration: 0.8,
          width: 0,
          delay: 1.4,
          ease: Power2.easeOut,
        });
        gsap.to(".descriptionReveal", {
          duration: 0.8,
          width: 0,
          delay: 1.6,
          ease: Power2.easeOut,
        });
        tl.staggerTo(
          "#image-container img",
          0.5,
          {
            scale: 1,
            delay: 1.8,
            borderRadius: "50%",
            transformOrigin: "50% 50%",
          },
          0.1
        );
        tl.staggerTo(
          ".arrowsContainer svg",
          0.5,
          {
            opacity: 1,
            scale: 1,
            borderRadius: "50%",
            transformOrigin: "50% 50%",
          },
          0.1
        );
      }, 2100);
    }
  };

  const nextProject = async () => {
    if (vinylPlaying) {
      player.pause();
      registerPlayer(null);
      needle_up.play();
      needleD.pause();
      await setVinylPlaying(false);
    }
    gsap.to(".disco", {
      duration: 1,
      opacity: 0,
      left: "100%",
      onComplete: () => {
        gsap.to(".disco", {
          opacity: 0,
          left: "50%",
          top: "100%",
        });
      },
    });
    gsap.to(".bandImg", {
      duration: 0.5,
      delay: 0.5,
      maskImage:
        "radial-gradient(closest-side,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0))",
    });
    gsap.to(".bandNameReveal", {
      duration: 0.8,
      width: "100%",
      delay: 0.2,
      ease: Power2.easeIn,
    });
    gsap.to(".genreReveal", {
      duration: 0.8,
      width: "100%",
      delay: 0.4,
      ease: Power2.easeIn,
    });
    gsap.to(".descriptionReveal", {
      duration: 0.8,
      width: "100%",
      delay: 0.6,
      ease: Power2.easeIn,
    });

    const tl = new TimelineLite();

    tl.staggerTo(
      "#image-container img",
      0.5,
      {
        scale: 0,
        delay: 0.8,
        borderRadius: "50%",
        transformOrigin: "50% 50%",
      },
      0.1
    );

    tl.staggerTo(
      ".arrowsContainer svg",
      0.3,
      {
        opacity: 1,
        scale: 0,
        borderRadius: "50%",
        transformOrigin: "50% 50%",
      },
      0.1
    );

    if (bandIndex === musicProjects.length - 1) {
      setTimeout(() => {
        setBandIndex(0);
        setCurrentTrackIndex(0);
        gsap.to(".disco", {
          duration: 1,
          opacity: 1,
          top: "50%",
        });
        gsap.to(".bandImg", {
          duration: 0.5,
          delay: 1,
          maskImage:
            "radial-gradient(closest-side,rgba(0, 0, 0, 1),rgba(0, 0, 0, 0))",
        });
        gsap.to(".bandNameReveal", {
          duration: 0.8,
          width: 0,
          delay: 1.2,
          ease: Power2.easeOut,
        });
        gsap.to(".genreReveal", {
          duration: 0.8,
          width: 0,
          delay: 1.4,
          ease: Power2.easeOut,
        });
        gsap.to(".descriptionReveal", {
          duration: 0.8,
          width: 0,
          delay: 1.6,
          ease: Power2.easeOut,
        });
        tl.staggerTo(
          "#image-container img",
          0.5,
          {
            scale: 1,
            delay: 1.8,
            borderRadius: "50%",
            transformOrigin: "50% 50%",
          },
          0.1
        );
        tl.staggerTo(
          ".arrowsContainer svg",
          0.5,
          {
            opacity: 1,
            scale: 1,
            borderRadius: "50%",
            transformOrigin: "50% 50%",
          },
          0.1
        );
      }, 2100);
    } else {
      setTimeout(() => {
        setBandIndex((state) => (state += 1));
        setCurrentTrackIndex(0);
        gsap.to(".disco", {
          duration: 1,
          opacity: 1,
          top: "50%",
        });
        gsap.to(".bandImg", {
          duration: 0.5,
          delay: 1,
          maskImage:
            "radial-gradient(closest-side,rgba(0, 0, 0, 1),rgba(0, 0, 0, 0))",
        });
        gsap.to(".bandNameReveal", {
          duration: 0.8,
          width: 0,
          delay: 1.2,
          ease: Power2.easeOut,
        });
        gsap.to(".genreReveal", {
          duration: 0.8,
          width: 0,
          delay: 1.4,
          ease: Power2.easeOut,
        });
        gsap.to(".descriptionReveal", {
          duration: 0.8,
          width: 0,
          delay: 1.6,
          ease: Power2.easeOut,
        });
        tl.staggerTo(
          "#image-container img",
          0.5,
          {
            scale: 1,
            delay: 1.8,
            borderRadius: "50%",
            transformOrigin: "50% 50%",
          },
          0.1
        );
        tl.staggerTo(
          ".arrowsContainer svg",
          0.5,
          {
            opacity: 1,
            scale: 1,
            borderRadius: "50%",
            transformOrigin: "50% 50%",
          },
          0.1
        );
      }, 2100);
    }
  };

  useEffect(() => {
    if (Object.keys(screens).length > 0 && screens.md) {
      setShowBtn(true);
    } else if (Object.keys(screens).length > 0 && screens.lg) {
      setShowBtn(true);
    } else if (Object.keys(screens).length > 0 && screens.xl) {
      setShowBtn(true);
    } else if (Object.keys(screens).length > 0 && screens.sm) {
      setShowBtn(false);
    } else if (Object.keys(screens).length > 0 && screens.xs) {
      setShowBtn(false);
    }
  }, [screens]);

  const vinylLayout = {
    xs: { span: 24, offset: 0, order: 2 },
    sm: { span: 24, offset: 0, order: 2 },
    md: { span: 8, offset: 1, order: 2 },
    lg: { span: 8, offset: 1, order: 2 },
  };

  const infosLayout = {
    xs: { span: 24, offset: 0, order: 1 },
    sm: { span: 24, offset: 0, order: 1 },
    md: { span: 12, offset: 1, order: 1 },
    lg: { span: 12, offset: 1, order: 1 },
  };

  return (
    <div className="musicContainer">
      <Row>
        <Col {...infosLayout}>
          <div className="bandContainer">
            <div className="pictureContainer">
              <img
                src={musicProjects[bandIndex].img}
                alt={musicProjects[bandIndex].name}
                className="bandImg"
              />
            </div>
            <div className="infosContainer">
              <div>
                <h2 className="bandName">{musicProjects[bandIndex].name}</h2>
                <div className="bandNameReveal" />
              </div>
              <div>
                <h3 className="genre">{musicProjects[bandIndex].genre}</h3>
                <div className="genreReveal" />
              </div>
              <div>
                <p className="description">
                  {musicProjects[bandIndex].description}
                </p>
                <div className="descriptionReveal" />
              </div>
            </div>
            <div className="tracksContainer">
              <div id="image-container">
                {tracksLoaded &&
                  bands[bandIndex].tracks.map((track, i) => {
                    if (showBtn) {
                      return (
                        <Tooltip
                          title={track.title}
                          color="black"
                          key={track.id}
                        >
                          <a
                            href="javascript:void(0)"
                            role="button"
                            className="imgLink link"
                            onClick={() => stream(track.id)}
                            onMouseEnter={() => {
                              setDisplayPlay(i);
                              setCursorState("hover");
                            }}
                            onMouseLeave={() => {
                              setDisplayPlay(null);
                              setCursorState("notHover");
                            }}
                            key={track.id}
                          >
                            <img
                              className="thumb tracksImg"
                              src={
                                track.artwork_url
                                  ? track.artwork_url
                                  : track.user.avatar_url
                              }
                              title={track.title}
                              alt={track.title}
                              width={currentTrackIndex === i ? "100" : "70"}
                              height={currentTrackIndex === i ? "100" : "70"}
                              style={
                                displayPlay === i
                                  ? {
                                      opacity: "0",
                                    }
                                  : {
                                      opacity: "1",
                                    }
                              }
                            />
                            {currentTrackIndex === i && vinylPlaying ? (
                              displayPlay === i ? null : (
                                <Equalizer />
                              )
                            ) : null}
                            {i === displayPlay ? (
                              vinylPlaying && currentTrackIndex === i ? (
                                <PauseCircleOutlined
                                  style={{
                                    fontSize: "2em",
                                    position: "absolute",
                                    top: 0,
                                    left:
                                      currentTrackIndex === i
                                        ? "1.2em"
                                        : "0.8em",
                                  }}
                                />
                              ) : (
                                <PlayCircleOutlined
                                  style={{
                                    fontSize: "2em",
                                    position: "absolute",
                                    top: 0,
                                    left:
                                      currentTrackIndex === i
                                        ? "1.2em"
                                        : "0.8em",
                                  }}
                                />
                              )
                            ) : null}
                          </a>
                        </Tooltip>
                      );
                    } else {
                      return (
                        <a
                          href="javascript:void(0)"
                          role="button"
                          className="imgLink link"
                          onClick={() => stream(track.id)}
                          key={track.id}
                        >
                          <img
                            className="thumb tracksImg"
                            src={
                              track.artwork_url
                                ? track.artwork_url
                                : track.user.avatar_url
                            }
                            title={track.title}
                            alt={track.title}
                            width={currentTrackIndex === i ? "100" : "70"}
                            height={currentTrackIndex === i ? "100" : "70"}
                            style={
                              displayPlay === i
                                ? {
                                    opacity: "0",
                                  }
                                : {
                                    opacity: "1",
                                  }
                            }
                          />
                          {currentTrackIndex === i && vinylPlaying ? (
                            displayPlay === i ? null : (
                              <Equalizer />
                            )
                          ) : null}
                        </a>
                      );
                    }
                  })}
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
          </div>
        </Col>
        <Col {...vinylLayout}>
          <Row
            justify="center"
            direction="column"
            style={
              showBtn
                ? {
                    height: "100%",
                    background: "radial-gradient(closest-side, #C67D30, black)",
                  }
                : {
                    marginTop: "1em",
                    height: "60vh",
                    background: "radial-gradient(closest-side, #C67D30, black)",
                  }
            }
          >
            <div
              className={classnames(
                vinylPlaying ? "discoPlay" : "disco",
                bandsLoaded && bands[bandIndex].permalink
              )}
            ></div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(Music);
