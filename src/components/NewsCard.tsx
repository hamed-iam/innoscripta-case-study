import { Typography } from "antd";
import { useState } from "react";
import { LinkOutlined } from "@ant-design/icons";
import ImageWithFallback from "./ImageWithFallback";
import type { NewsItem } from "../types";

const { Title } = Typography;

const NewsCard = ({ ...article }: NewsItem) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border rounded p-2 min-h-[200px]">
      <div>
        <Title level={4}>{article.title}</Title>
        <Typography.Paragraph
          className={`overflow-hidden line-clamp-${expanded ? "none" : "3"}`}
        >
          {article.description}
        </Typography.Paragraph>

        <ImageWithFallback
          src={article.urlToImage}
          fallbackSrc="/src/assets/news-ph.png"
          alt="Description of your image"
        />
      </div>

      <div>
        <Typography.Paragraph
          ellipsis={{
            rows: 2,
            expandable: "collapsible",
            expanded,
            onExpand: (_, info) => setExpanded(info.expanded),
          }}
        >
          {article.content}
        </Typography.Paragraph>
      </div>

      <div className="flex justify-between">
        <p>{article.source.name}</p>
        <a href={article.url} target="_blank">
          <LinkOutlined />
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
