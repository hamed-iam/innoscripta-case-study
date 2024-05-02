import { useState } from "react";
import "./App.css";
import { useNetwork } from "./hooks";
import LoadingCard from "./components/LoadingCard";
import NewsCard from "./components/NewsCard";
import { Button, DatePicker, Input, Select } from "antd";
import { CATEGORIES } from "./constants";
import SourceSelector from "./components/SourceSelector";

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
    setFilters({
      ...filters,
      [filter]: event,
    });
  };

  console.log("sources :>> ", sourcesData);

  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="w-full flex flex-col gap-4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
          <Input value={search} onChange={handleSearch} />
          <Select
            onChange={(e) => handleFilterChange(e, "category")}
            options={CATEGORIES}
          />
          {/* <SourceSelector /> */}
          <Select
            mode="multiple"
            allowClear
            placeholder="Please select"
            loading={isSourcesLoading}
            onChange={(e) => handleFilterChange(e, "source")}
            options={sourcesData?.sources.map((source) => ({
              label: source.name,
              value: source.id,
            }))}
          />
          <DatePicker
            onChange={(e) => handleFilterChange(e, "from")}
            placeholder="From"
          />
          <DatePicker
            onChange={(e) => handleFilterChange(e, "to")}
            placeholder="To"
          />

          <Button onClick={onRefetch}>Search</Button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {loading
          ? Array(10)
              .fill("")
              .map(() => (
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                  <LoadingCard />
                </div>
              ))
          : data?.articles.map((item) => (
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
