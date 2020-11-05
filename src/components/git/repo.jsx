import { CopyOutlined, GithubOutlined } from "@ant-design/icons";
import { Button, Grid, message } from "antd";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import TextTruncate from "react-text-truncate";

import "./repo.less";

//TODO: z-index buttons on top
const { useBreakpoint } = Grid;

const Repo = ({ showRepo, repo, setCursorState }) => {
  const screens = useBreakpoint();
  const [truncated, setTruncated] = useState(1);
  const [showTruncated, setShowTruncated] = useState(false);
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

  useEffect(() => {
    if (Object.keys(screens).length > 0 && screens.md) {
      setTruncated(0);
      setShowTruncated(false);
    } else if (Object.keys(screens).length > 0 && screens.lg) {
      setTruncated(0);
      setShowTruncated(false);
    } else if (Object.keys(screens).length > 0 && screens.xl) {
      setTruncated(0);
      setShowTruncated(false);
    } else if (Object.keys(screens).length > 0 && screens.sm) {
      setTruncated(1);
      setShowTruncated(false);
    } else if (Object.keys(screens).length > 0 && screens.xs) {
      setTruncated(1);
      setShowTruncated(true);
    }
  }, [screens]);
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
          <p className="description">
            {showTruncated ? (
              <>
                <TextTruncate
                  line={truncated}
                  element="span"
                  truncateText="…"
                  text={repo.description}
                />
                <Button
                  type="link"
                  onMouseEnter={() => {
                    setCursorState("hover");
                  }}
                  onMouseLeave={() => {
                    setCursorState("notHover");
                  }}
                  onClick={() =>
                    truncated === 0 ? setTruncated(1) : setTruncated(0)
                  }
                >
                  {truncated === 0 ? "Réduire" : "Lire Plus"}
                </Button>
              </>
            ) : (
              repo.description
            )}
          </p>
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
