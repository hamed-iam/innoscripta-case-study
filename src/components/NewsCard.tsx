import { Typography } from "antd";
import { useState } from "react";
import { LinkOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface NewsCardProps {
  article: {
    source: {
      id: number | string;
      name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string;
  };
}

const NewsCard = ({ article }: NewsCardProps) => {
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
        {article.urlToImage && <img alt="example" src={article.urlToImage} />}
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
        <p>{article.author}</p>
        <a href={article.url} target="_blank">
          <LinkOutlined />
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
