import gsap from "gsap";

import React, { useEffect, useState } from "react";
import SC from "soundcloud";
import "./index.less";
import { Col, Row } from "antd";
import Equalizer from "./equalizer";

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

  const stream = (track) => {
    SC.stream("/tracks/" + track.id).then((player) => {
      player.play();
    });
  };

  useEffect(() => {
    setTimeout(() => {
      gsap.to(".disco", { duration: 1, opacity: 0, top: "20em" });
    }, 1000);
  });

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
              <div id="image-container">
                {tracksLoaded &&
                  bands[0].tracks.map((track) => (
                    <a href="#" onClick={() => stream(track)} key={track.id}>
                      <img
                        className="thumb"
                        src={
                          track.artwork_url
                            ? track.artwork_url
                            : track.user.avatar_url
                        }
                        alt={track.title}
                        width="70"
                        height="70"
                      />
                      <Equalizer />
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
            <div className="disco"></div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Music;
