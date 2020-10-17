import {
  CopyOutlined,
  GithubOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, message } from "antd";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import "./repo.less";

const Repo = ({ showRepo, repo }) => {
  const regex = /src="/gi;
  const rmImgUpdated =
    showRepo &&
    repo.readme_html.replace(
      regex,
      `src="https://github.com/LeopoldAssogbaA/${repo.name}/raw/${repo.default_branch}/`
    );
  if (showRepo) {
    return (
      <div className="repoContainer" key={repo.id}>
        <div>
          <div className="repoTitle">
            <h2>{repo.name}</h2>
            <div className="repoLink">
              <CopyToClipboard
                text={repo.clone_url}
                onCopy={() => {
                  message.warning("The link has been copied!");
                }}
              >
                <Button type="link" icon={<CopyOutlined />}>
                  Clone repo
                </Button>
              </CopyToClipboard>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                <Button type="link" icon={<GithubOutlined />}>
                  Visit on GitHub
                </Button>
              </a>
            </div>
          </div>
          <p className="description">{repo.description}</p>
          <span>{repo.size} Mo</span>

          <br />
          <section dangerouslySetInnerHTML={{ __html: rmImgUpdated }} />
          <br />
        </div>
      </div>
    );
  } else {
    return (
      <div className="loadingContainer">
        <LoadingOutlined />
      </div>
    );
  }
};
export default Repo;
