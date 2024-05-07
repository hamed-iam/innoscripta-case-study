import { useEffect, useState } from "react";
import LoadingCard from "./LoadingCard";
import NewsCard from "./NewsCard";
import Filters from "./Filters";
import type { NewsApiItem, GuardiansItem, NyTimesItem } from "../types";
import { useQueries } from "@tanstack/react-query";
import { fetchGuardians, fetchNewApi, fetchNytimes } from "../lib";
import { FieldValues } from "react-hook-form";

type NewsItem = NewsApiItem & GuardiansItem & NyTimesItem;

export default function Home() {
  const [mainData, setMainData] = useState<NewsItem[]>([]);
  const [filters, setFilters] = useState({
    q: "",
    from: "",
    to: "",
    category: "",
  });

  const [
    { data: newsApiData, isLoading: isNewsApiLoading },
    { data: nyTimesData, isLoading: isNyTimesLoading },
    { data: guardiansData, isLoading: isGuardiansLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: [
          "newsApi",
          filters.q,
          filters.from,
          filters.to,
          filters.category,
        ],
        queryFn: () =>
          fetchNewApi({
            q: filters.q || "general",
            ...(filters.category && { category: filters.category }),
            ...(filters.from && { from: filters.from }),
            ...(filters.to && { to: filters.to }),
          }),
        staleTime: Infinity,
      },
      {
        queryKey: ["nyTimes", filters.q, filters.category],
        queryFn: () =>
          fetchNytimes({
            ...(filters.q && { q: filters.q }),
            ...(filters.category && { fq: filters.category }),
            ...(filters.from && {
              begin_date: filters.from.replaceAll("-", ""),
            }),
            ...(filters.to && { end_date: filters.to.replaceAll("-", "") }),
          }),
        staleTime: Infinity,
      },
      {
        queryKey: [
          "guardians",
          filters.q,
          filters.category,
          filters.from,
          filters.to,
        ],
        queryFn: () =>
          fetchGuardians({
            ...(filters.category && { tag: filters.category }),
            ...(filters.q && { q: filters.q }),
            ...(filters.from && { "from-date": filters.from }),
            ...(filters.to && { "to-date": filters.to }),
          }),
        staleTime: Infinity,
      },
    ],
  });

  const handleFiltersSubmit = (formData: FieldValues) => {
    setFilters({
      q: formData.search,
      from: formData?.from,
      to: formData?.to,
      category: formData?.category,
    });
  };

  const handleFilterRemovedItems = (items: NewsItem[]) =>
    items.filter(
      (article) =>
        article?.title !== "[Removed]" && article?.source?.name !== "[Removed]"
    );

  const isLoading = [
    isNewsApiLoading,
    isNyTimesLoading,
    isGuardiansLoading,
  ].some((res) => res);

  useEffect(() => {
    if (!isLoading) {
      setMainData([
        ...newsApiData.articles,
        ...guardiansData.response.results,
        ...nyTimesData.response.docs,
      ]);
    }
  }, [isLoading]);

  console.log("mainData", mainData);

  return (
    <>
      <Filters loading={isLoading} onSubmit={handleFiltersSubmit} />

      <div className="flex flex-wrap justify-center gap-4">
        {isLoading
          ? Array(10)
              .fill("")
              .map(() => (
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                  <LoadingCard />
                </div>
              ))
          : handleFilterRemovedItems(mainData)?.map((item) => {
              return (
                <div
                  key={Math.random()}
                  className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                >
                  <NewsCard {...item} />
                </div>
              );
            })}
      </div>
    </>
  );
}
