import React, { useEffect, useState } from "react";
import { Octokit } from "@octokit/core";

const GitComponent = () => {
  const [repos, setRepos] = useState([]);
  const [repoLoaded, setRepoLoaded] = useState(false);
  const octokit = new Octokit({
    auth: "5483e014842e8d8bd6fd75f12e90aab3401aee2a",
  });

  const loadRepos = async () => {
    const owner = "LeopoldAssogbaA";

    const fetchRepos = await octokit.request(`GET /users/{owner}/repos`, {
      owner,
    });
    setRepos(fetchRepos.data);
    setRepoLoaded(true);
  };

  useEffect(() => {
    !repoLoaded && loadRepos();
  }, [repoLoaded]);

  console.log(repos[0]);

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
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default GitComponent;
