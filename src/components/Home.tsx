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
    // category: "general",
    // sources: "",
  });

  const [
    { data: newsApiData, isLoading: isNewsApiLoading },
    { data: nyTimesData, isLoading: isNyTimesLoading },
    { data: guardiansData, isLoading: isGuardiansLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ["newsApi", filters.q, filters.from, filters.to],
        queryFn: () =>
          fetchNewApi({
            q: filters.q || "general",
            ...(filters.from && { from: filters.from }),
            ...(filters.to && { to: filters.to }),
          }),
        staleTime: Infinity,
      },
      {
        queryKey: ["nyTimes", filters.q],
        queryFn: () => fetchNytimes({ q: filters.q }),
        staleTime: Infinity,
      },
      {
        queryKey: ["guardians", filters.q],
        queryFn: () => fetchGuardians({ q: filters.q }),
        staleTime: Infinity,
      },
    ],
  });

  const handleFiltersSubmit = (formData: FieldValues) => {
    setFilters({
      q: formData.search,
      from: formData?.from,
      to: formData?.to,
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
        ...nyTimesData.results,
      ]);
    }
  }, [isLoading]);

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
