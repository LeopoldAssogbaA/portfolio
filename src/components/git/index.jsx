import React, { useEffect, useState } from "react";
import { Octokit } from "@octokit/core";
import { LoadingOutlined } from "@ant-design/icons";

import "./index.less";
import { Col, Row } from "antd";
import Repo from "./repo";

const GitComponent = () => {
  const [repos, setRepos] = useState([]);
  const [reposLoaded, setReposLoaded] = useState(false);
  const [reposUpdated, setReposUpdated] = useState(false);
  const [readmesLoaded, setReadmesLoaded] = useState(false);
  const [repoIndex, setRepoIndex] = useState(0);

  const octokit = new Octokit({
    auth: "5483e014842e8d8bd6fd75f12e90aab3401aee2a",
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
            console.log("reposUpdated!!!");
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

  reposUpdated && console.log("repos", repos);
  return (
    <div className="gitContainer">
      {/* <h2>Github Repositories</h2> */}

      <div className="imgContainer">
        <Row>
          <Col span={12} offset={10}>
            <div className="reposContainer">
              <Repo showRepo={reposUpdated} repo={repos[repoIndex]} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default GitComponent;
