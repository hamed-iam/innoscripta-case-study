import { Typography } from "antd";
import { useState } from "react";
import { LinkOutlined } from "@ant-design/icons";
import ImageWithFallback from "./ImageWithFallback";
import type { NewsApiItem, GuardiansItem, NyArticleSearch } from "../types";

type Article = NewsApiItem & GuardiansItem & NyArticleSearch & any;

const { Title, Paragraph } = Typography;

const NewsCard = (article: Article) => {
  const [expanded, setExpanded] = useState(false);

  if (article?.title === "[Removed]" && article?.source?.name === "[Removed]")
    return;

  const renderImage = () => {
    if (article.multimedia?.length > 0) {
      const biggestImage = article.multimedia[article.multimedia.length - 1];

      return (
        <ImageWithFallback
          src={biggestImage?.url || ""}
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
        <Title level={4}>
          {article.title || article.webTitle || article.abstract}
        </Title>
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
          {article.content || article.lead_paragraph}
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
