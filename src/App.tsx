import { useState } from "react";
import "./App.css";
import { useNetwork } from "./hooks";
import LoadingCard from "./components/LoadingCard";
import NewsCard from "./components/NewsCard";
import Filters from "./components/Filters";

function App() {
  const [search, setSearch] = useState("apple");
  const [filters, setFilters] = useState({
    q: search,
    // from: "",
    // to: "",
    // category: "general",
    // sources: "",
  });

  const { data, onRefetch, loading } = useNetwork(
    "https://newsapi.org/v2/top-headlines",
    {
      params: {
        ...filters,
      },
    }
  );

  const { data: sourcesData, loading: isSourcesLoading } = useNetwork(
    "https://newsapi.org/v2/top-headlines/sources"
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event: string, filter: string) => {
    console.log("event :>> ", event);
    setFilters({
      ...filters,
      [filter]: event,
    });
  };

  const filteredItems = data?.articles?.filter(
    (article: any) =>
      article?.title !== "[Removed]" && article?.source?.name !== "[Removed]"
  );

  return (
    <>
      <Filters
        loading={isSourcesLoading}
        search={search}
        sourcesData={sourcesData}
        onFilterChange={handleFilterChange}
        onRefetch={onRefetch}
        onSearch={handleSearch}
      />

      <div className="flex flex-wrap justify-center gap-4">
        {loading
          ? Array(10)
              .fill("")
              .map(() => (
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                  <LoadingCard />
                </div>
              ))
          : filteredItems?.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
              >
                <NewsCard article={item} />
              </div>
            ))}
      </div>
    </>
  );
}

export default App;
