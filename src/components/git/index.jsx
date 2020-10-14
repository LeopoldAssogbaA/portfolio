import React, { useEffect, useState } from "react";
import { Octokit } from "@octokit/core";

const GitComponent = () => {
  const [repos, setRepos] = useState([]);
  const [repoLoaded, setRepoLoaded] = useState(false);
  const octokit = new Octokit({
    auth: "5483e014842e8d8bd6fd75f12e90aab3401aee2a",
  });

  useEffect(() => {
    const loadRepos = async () => {
      const owner = "LeopoldAssogbaA";

      const fetchRepos = await octokit.request(`GET /users/{owner}/reposR`, {
        owner,
      });
      setRepos(fetchRepos.data);
      setRepoLoaded(true);
    };

    !repoLoaded && loadRepos();
  }, [octokit, repoLoaded]);

  console.log(repos[0]);
  // TODO: get readme
  // https://developer.github.com/v3/repos/contents/#get-a-repository-readme
  return (
    <div>
      <h2>Github Repositories</h2>
      <ul>
        {repoLoaded &&
          repos.map((repo) => (
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
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default GitComponent;
