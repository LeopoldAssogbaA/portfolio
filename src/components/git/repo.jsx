import { CopyOutlined, GithubOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import "./repo.less";

//TODO: z-index buttons on top

const Repo = ({ showRepo, repo, setCursorState }) => {
  const regex = /src="/gi;
  const regex2 = /href=/gi;
  const rmImgUpdated =
    showRepo &&
    repo.readme_html
      .replace(
        regex,
        `src="https://github.com/LeopoldAssogbaA/${repo.name}/raw/${repo.default_branch}/`
      )
      .replace(regex2, "");
  if (showRepo) {
    return (
      <div className="repoContainer" key={repo.id}>
        <div>
          <div className="repoTitle">
            <h2>{repo.name}</h2>
            <div className="repoLink">
              <CopyToClipboard
                className="link"
                text={repo.clone_url}
                onCopy={() => {
                  message.warning("The link has been copied!");
                }}
                onMouseEnter={() => {
                  setCursorState("hover");
                }}
                onMouseLeave={() => {
                  setCursorState("notHover");
                }}
              >
                <Button type="link" icon={<CopyOutlined />}>
                  Clone repo
                </Button>
              </CopyToClipboard>
              <a
                className="link"
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  setCursorState("hover");
                }}
                onMouseLeave={() => {
                  setCursorState("notHover");
                }}
              >
                <Button type="link" icon={<GithubOutlined />}>
                  Visit on GitHub
                </Button>
              </a>
            </div>
          </div>
          <p className="description">{repo.description}</p>
          <span>{repo.size} Mo</span>

          <h2>Readme.MD</h2>
          <section dangerouslySetInnerHTML={{ __html: rmImgUpdated }} />
          <br />
        </div>
      </div>
    );
  } else {
    return null;
  }
};
export default Repo;
