import React, { useEffect, useRef, useState } from "react";
import { Octokit } from "@octokit/core";
import {
  LeftOutlined,
  RightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import "./index.less";
import { Button, Col, Row } from "antd";
import Repo from "./repo";

import GITAUTH from "../../token.json";
import gsap from "gsap";
import { Bounce } from "gsap/gsap-core";

const GitComponent = () => {
  const [repos, setRepos] = useState([]);
  const [reposLoaded, setReposLoaded] = useState(false);
  const [reposUpdated, setReposUpdated] = useState(false);
  const [readmesLoaded, setReadmesLoaded] = useState(false);
  const [repoIndex, setRepoIndex] = useState(0);
  const [repoVisible, setRepoVisible] = useState(true);
  const [loadReavealed, setLoadReavealed] = useState(false);

  let reposRef = useRef(null);
  let lightLettersRef = useRef(null);
  let repoRevealPrevRef = useRef(null);
  let prevTitleRef = useRef(null);
  let repoRevealNextRef = useRef(null);
  let nextTitleRef = useRef(null);

  const octokit = new Octokit({
    auth: GITAUTH.token,
  });

  useEffect(() => {
    const loadRepos = async () => {
      const owner = "LeopoldAssogbaA";
      try {
        const fetchRepos = await octokit.request(`GET /users/{owner}/repos`, {
          owner,
        });
        setRepos(fetchRepos.data);
        setReposLoaded(true);
      } catch (e) {
        console.error("error repos fetch", e);
      }
    };

    const loadReadmes = () => {
      const owner = "LeopoldAssogbaA";
      const reposUpdated = [];

      try {
        repos.forEach(async (repo) => {
          const repoName = repo.name;
          const fetchReadme = await octokit.request(
            `GET /repos/{owner}/{repoName}/readme`,
            {
              owner,
              repoName,
              headers: { Accept: "application/vnd.github.html" },
            }
          );

          const currentRepoIndex = repos.findIndex(
            (repo) => repoName === repo.name
          );

          reposUpdated.push({
            ...repos[currentRepoIndex],
            readme_html: fetchReadme.data,
          });

          if (reposUpdated.length === repos.length) {
            setRepos(reposUpdated);
            setReposUpdated(true);
          }
        });
        setReadmesLoaded(true);
      } catch (e) {
        console.error("error", e);
      }
    };

    !reposLoaded && loadRepos();
    reposLoaded && !readmesLoaded && loadReadmes();
  }, [octokit, readmesLoaded, repos, reposLoaded]);

  const previousRepo = () => {
    if (repoIndex === 0 || repoIndex % 3 === 0) {
      gsap.to(lightLettersRef, {
        opacity: 0,
        duration: 0.5,
        delay: 2.1,
        ease: Bounce.easeOut,
      });
      gsap.to(lightLettersRef, {
        opacity: 1,
        duration: 0.5,
        delay: 2.6,
        ease: Bounce.easeOut,
      });
    }

    setRepoVisible(false);

    if (repoIndex === 0) {
      gsap.to(repoRevealPrevRef, { duration: 0.8, height: "100%" });
      gsap.to(prevTitleRef, {
        duration: 0.6,
        opacity: 1,
        top: "25%",
        delay: 0.5,
      });
      gsap.to(prevTitleRef, {
        duration: 0.6,
        opacity: 0,
        top: 0,
        delay: 2,
      });
      setTimeout(() => {
        setRepoIndex(repos.length - 1);
        setRepoVisible(true);
      }, 2600);
      gsap.to(repoRevealPrevRef, {
        height: "0",
        duration: 0.8,
        delay: 2.6,
      });
    } else {
      gsap.to(repoRevealPrevRef, { duration: 0.8, height: "100%" });
      gsap.to(prevTitleRef, {
        duration: 0.6,
        opacity: 1,
        top: "25%",
        delay: 0.5,
      });
      gsap.to(prevTitleRef, {
        duration: 0.6,
        opacity: 0,
        top: 0,
        delay: 2,
      });
      setTimeout(() => {
        setRepoIndex((state) => (state -= 1));
        setRepoVisible(true);
      }, 2600);
      gsap.to(repoRevealPrevRef, {
        height: "0",
        duration: 0.8,
        delay: 2.6,
      });
    }
  };

  const nextRepo = () => {
    if (repoIndex === 0 || repoIndex % 3 === 0) {
      gsap.to(lightLettersRef, {
        opacity: 0,
        duration: 0.5,
        delay: 2.1,
        ease: Bounce.easeOut,
      });
      gsap.to(lightLettersRef, {
        opacity: 1,
        duration: 0.5,
        delay: 2.6,
        ease: Bounce.easeOut,
      });
    }

    setRepoVisible(false);

    if (repoIndex === repos.length - 1) {
      gsap.to(repoRevealNextRef, { duration: 0.8, height: "100%" });
      gsap.to(nextTitleRef, {
        duration: 0.6,
        opacity: 1,
        top: "25%",
        delay: 0.5,
      });
      gsap.to(nextTitleRef, {
        duration: 0.6,
        opacity: 0,
        top: 0,
        delay: 2,
      });
      setTimeout(() => {
        setRepoIndex(0);
        setRepoVisible(true);
      }, 2600);
      gsap.to(repoRevealNextRef, {
        height: "0",
        duration: 0.8,
        delay: 2.6,
      });
    } else {
      gsap.to(repoRevealNextRef, { duration: 0.8, height: "100%" });
      gsap.to(nextTitleRef, {
        duration: 0.6,
        opacity: 1,
        top: "25%",
        delay: 0.5,
      });
      gsap.to(nextTitleRef, {
        duration: 0.6,
        opacity: 0,
        top: 0,
        delay: 2,
      });
      setTimeout(() => {
        setRepoIndex((state) => (state += 1));
        setRepoVisible(true);
      }, 2600);
      gsap.to(repoRevealNextRef, {
        height: "0",
        duration: 0.8,
        delay: 2.6,
      });
    }
  };

  useEffect(() => {
    gsap.to(lightLettersRef, {
      duration: 1.6,
      opacity: 1,
      ease: Bounce.easeInOut,
      delay: 0.8,
    });

    setRepoVisible(false);
    reposLoaded &&
      gsap.to(repoRevealNextRef, {
        duration: 0,
        height: "100%",
        onComplete: () => {
          gsap.to(repoRevealNextRef, {
            delay: 0.8,
            height: "0",
            duration: 1,
          });
          gsap.to(".loadingReaveal", {
            top: "-2em",
            opacity: 0,
            duration: 1,
            delay: 0.2,
            onComplete: () => {
              setLoadReavealed(true);
              setRepoVisible(true);
            },
          });
        },
      });
  }, [reposLoaded]);

  return (
    <div className="gitContainer">
      <Row>
        <Col span={4}>
          <img
            src="assets/img/lightletters1.jpeg"
            alt="light letters"
            className="lightLetters"
            ref={(el) => (lightLettersRef = el)}
          />
        </Col>
        <Col span={2} className="arrowLeft">
          <Button
            onClick={() => repoVisible && previousRepo()}
            icon={<LeftOutlined style={{ fontSize: "2.5em" }} />}
            type="link"
            size="large"
          />
        </Col>
        <Col span={13}>
          <div className="reposContainer" ref={(el) => (reposRef = el)}>
            {!loadReavealed && (
              <LoadingOutlined
                className="loadingReaveal"
                style={{
                  position: "absolute",
                  fontSize: "5em",
                  zIndex: 2,
                  top: "2em",
                  left: "50%",
                }}
              />
            )}
            <div
              className="repoRevealPrev"
              ref={(el) => (repoRevealPrevRef = el)}
            >
              <span className="prevTitle" ref={(el) => (prevTitleRef = el)}>
                {reposLoaded &&
                  repos[repoIndex !== 0 ? repoIndex - 1 : repos.length - 1]
                    .name}
                <img
                  src="assets/img/OctocatDP.gif"
                  alt="octocat github"
                  className="octocat"
                />
              </span>
            </div>
            <div
              className="repoRevealNext"
              ref={(el) => (repoRevealNextRef = el)}
            >
              <span className="nextTitle" ref={(el) => (nextTitleRef = el)}>
                {reposLoaded &&
                  repos[repoIndex !== repos.length - 1 ? repoIndex + 1 : 0]
                    .name}
                <img
                  src="assets/img/OctocatDP.gif"
                  alt="octocat github"
                  className="octocat"
                />
              </span>
            </div>
            <Repo showRepo={reposUpdated} repo={repos[repoIndex]} />
          </div>
        </Col>
        <Col span={4} className="arrowRight">
          <Button
            onClick={() => repoVisible && nextRepo()}
            icon={<RightOutlined style={{ fontSize: "2.5em" }} />}
            type="link"
            size="large"
          />
        </Col>
      </Row>
    </div>
  );
};

export default GitComponent;
