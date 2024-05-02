import { Button, DatePicker, Input, Select } from "antd";
import { CATEGORIES } from "../constants";
import { ChangeEventHandler } from "react";

interface FiltersProps {
  loading: boolean;
  search: string;
  onFilterChange: (_val: string, _cat: string) => void;
  onSearch: ChangeEventHandler<HTMLInputElement>;
  sourcesData: any;
  onRefetch: () => void;
}

export default function Filters({
  search,
  sourcesData,
  loading,
  onFilterChange,
  onRefetch,
  onSearch,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full flex flex-col gap-4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
        <Input value={search} onChange={onSearch} />
        <Select
          onChange={(e) => onFilterChange(e, "category")}
          placeholder="Select category"
          options={CATEGORIES}
        />

        <Select
          mode="multiple"
          allowClear
          placeholder="Select Sources"
          loading={loading}
          onChange={(e) => onFilterChange(e, "source")}
          options={sourcesData?.sources.map((source) => ({
            label: source.name,
            value: source.id,
          }))}
        />
        <DatePicker
          onChange={(_, e) => onFilterChange(e, "from")}
          placeholder="From"
        />
        <DatePicker
          onChange={(_, e) => onFilterChange(e, "to")}
          placeholder="To"
        />

        <Button onClick={onRefetch}>Search</Button>
      </div>
    </div>
  );
}
