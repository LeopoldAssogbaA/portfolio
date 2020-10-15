import React, { useEffect, useState } from "react";
import { Octokit } from "@octokit/core";
import { LoadingOutlined } from "@ant-design/icons";

import "./index.less";

const GitComponent = () => {
  const [repos, setRepos] = useState([]);
  const [reposLoaded, setReposLoaded] = useState(false);
  const [reposUpdated, setReposUpdated] = useState(false);
  const [readmesLoaded, setReadmesLoaded] = useState(false);

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

    const regex = 'src="/LeopoldAssogbaA/"';
    console.log(regex);

    !reposLoaded && loadRepos();
    reposLoaded && !readmesLoaded && loadReadmes();
  }, [octokit, readmesLoaded, repos, reposLoaded]);

  return (
    <div className="gitContainer">
      <h2>Github Repositories</h2>
      <ul style={{ background: "#1f1f1f", padding: "2em" }}>
        {reposLoaded &&
          repos.map((repo) => {
            const regex = /src="/gi;
            const rmImgUpdated =
              reposUpdated &&
              repo.readme_html.replace(
                regex,
                `src="https://github.com/LeopoldAssogbaA/${repo.name}/raw/${repo.default_branch}/`
              );

            return (
              <li key={repo.id}>
                <div>
                  <span>{repo.name}</span>
                  <br />
                  <span>{repo.created_at}</span>
                  <br />
                  <span>{repo.description}</span>
                  <br />
                  <span>{repo.size} Mo</span>
                  <br />
                  <a href={repo.html_url}>Go to repo page </a>
                  <br />
                  <section
                    style={{ background: "darkgray", padding: "2em" }}
                    dangerouslySetInnerHTML={{ __html: rmImgUpdated }}
                  />
                  <br />
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default GitComponent;
