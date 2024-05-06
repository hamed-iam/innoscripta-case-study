import { Typography } from "antd";
import { useState } from "react";
import { LinkOutlined } from "@ant-design/icons";
import ImageWithFallback from "./ImageWithFallback";
import type { NewsApiItem, GuardiansItem, NyTimesItem } from "../types";

type Article = NewsApiItem & GuardiansItem & NyTimesItem;

const { Title, Paragraph } = Typography;

const NewsCard = (article: Article) => {
  const [expanded, setExpanded] = useState(false);

  if (article?.title === "[Removed]" && article?.source?.name === "[Removed]")
    return;

  const renderImage = () => {
    if (article.multimedia?.length > 0) {
      const mediumThreeByTwo440 = article.multimedia.find(
        (i) => i.format === "mediumThreeByTwo440"
      );
      return (
        <ImageWithFallback
          src={mediumThreeByTwo440?.url || ""}
          fallbackSrc="/src/assets/news-ph.png"
          alt="innoscripta news"
        />
      );
    }
    return (
      <ImageWithFallback
        src={article.urlToImage || article.fields?.thumbnail || ""}
        fallbackSrc="/src/assets/news-ph.png"
        alt="innoscripta news"
      />
    );
  };

  return (
    <div className="border rounded p-2 min-h-[200px]">
      <div>
        <Title level={4}>{article.title || article.webTitle}</Title>
        <Paragraph
          className={`overflow-hidden line-clamp-${expanded ? "none" : "3"}`}
        >
          {article.description}
        </Paragraph>
        {renderImage()}
      </div>
      <div>
        <Paragraph
          ellipsis={{
            rows: 2,
            expandable: "collapsible",
            expanded,
            onExpand: (_, info) => setExpanded(info.expanded),
          }}
        >
          {article.content}
        </Paragraph>
      </div>
      <div className="flex justify-between">
        <p>{article.source?.name || article?.source || article?.sectionName}</p>
        <a
          href={article.url || article.apiUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkOutlined />
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
