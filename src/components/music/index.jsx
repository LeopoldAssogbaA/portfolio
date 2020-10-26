import React, { useEffect, useState } from "react";
import classnames from "classnames";
import gsap from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin.js";

import SC from "soundcloud";
import { Col, Row } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Equalizer from "./equalizer";

import "./index.less";
// TODO: enhance page animation4
// TODO: Clean and ajust vinyl size
// Fade out onChange
// add needle Sound
// adjust Equalizer

export const Music = () => {
  const [bands, setBands] = useState([]);
  const [bandsLoaded, setBandsLoaded] = useState(false);
  const [tracksLoaded, setTracksLoaded] = useState(false);
  const [tracksCreated, setTracksCreated] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [vinylPlaying, setVinylPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [needleD, setNeedleD] = useState(
    new Audio(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/vinyl_needle_down_edit.mp3"
    )
  );
  const needle_up = new Audio("assets/sounds/needle-up.mp3");

  // ANIMATIONS --------------------------------------------

  useEffect(() => {
    tracksLoaded &&
      gsap.to(".disco", {
        duration: 1,
        opacity: 1,
        top: "50%",
      });
  });

  // DATAS ----------------------------------------------

  useEffect(() => {
    SC.initialize({
      client_id: "516b790a82b7c6d89856376fa4ced361",
      redirect_uri: "https://storymore.com/soundcloud/",
    });

    const getBands = () => {
      const bandsIds = ["179508571", "284443809"];
      const bandsUpdated = [];
      const bandsWithTracks = [];

      for (let i = 0; i < bandsIds.length; i++) {
        SC.get(`/users/${bandsIds[i]}`).then((band) => {
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
                  // reorder band for GH at start
                  const bandsWithTracksSorted = bandsWithTracks.sort((a, b) => {
                    if (a.id === "179508571") {
                      return b - a;
                    } else {
                      return a - b;
                    }
                  });
                  setBands(bandsWithTracksSorted);
                  setBandsLoaded(true);
                  setTracksLoaded(true);
                }
              });
            }
          }
        });
      }
    };

    !bandsLoaded && getBands();
  }, [bands, bandsLoaded, tracksCreated]);

  const stream = (trackId) => {
    const trackIndex = bands[0].tracks.findIndex(
      (track) => track.id === trackId
    );

    if (vinylPlaying) {
      if (trackIndex === currentTrack) {
        needleD.pause();
        needle_up.play();
        player.pause();
        setVinylPlaying(false);
      } else {
        needle_up.play();
        needleD.pause();
        player.pause();
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
            setPlayer(p);
            setVinylPlaying(true);
            setCurrentTrack(trackIndex);
          }, 4000);
        });
      }
    } else {
      if (trackIndex === currentTrack) {
        SC.stream("/tracks/" + trackId).then((p) => {
          needleD.play();
          p.play();
          setPlayer(p);
          setVinylPlaying(true);
          setCurrentTrack(trackIndex);
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
            setPlayer(p);
            setVinylPlaying(true);
            setCurrentTrack(trackIndex);
          }, 4000);
        });
      }
    }
  };

  console.log("bands", bands);

  return (
    <div className="musicContainer">
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
              <div id="image-container">
                {tracksLoaded &&
                  bands[0].tracks.map((track, i) => (
                    <a
                      href="javascript:void(0)"
                      role="button"
                      className="imgLink"
                      onClick={() => stream(track.id)}
                      key={track.id}
                    >
                      <img
                        className="thumb"
                        src={
                          track.artwork_url
                            ? track.artwork_url
                            : track.user.avatar_url
                        }
                        title={track.title}
                        alt={track.title}
                        width={currentTrack === i ? "100" : "70"}
                        height={currentTrack === i ? "100" : "70"}
                      />
                      {currentTrack === i ? (
                        vinylPlaying ? (
                          <Equalizer />
                        ) : // <CaretRightOutlined
                        //   style={{
                        //     fontSize: "2em",
                        //     position: "absolute",
                        //     top: 0,
                        //     left: "0.8em",
                        //   }}
                        // />
                        null
                      ) : null}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </Col>
        <Col span={10} offset={1}>
          <Row
            justify="center"
            direction="column"
            style={{
              height: "100%",
              background: "radial-gradient(closest-side, #C67D30, black)",
            }}
          >
            <div
              className={classnames(
                vinylPlaying ? "discoPlay" : "disco",
                bandsLoaded && bands[0].permalink
              )}
            ></div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Music;
