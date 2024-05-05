import { Button, DatePicker, Drawer, Input, Select } from "antd";
import { CATEGORIES, SOURCES } from "../constants";
import { ChangeEventHandler, useState } from "react";
import { FilterOutlined } from "@ant-design/icons";
interface FiltersProps {
  loading: boolean;
  search: string;
  onFilterChange: (_val: string | string[], _cat: string) => void;
  onSearch: ChangeEventHandler<HTMLInputElement>;
  onRefetch: () => void;
}

export default function Filters({
  search,
  loading,
  onFilterChange,
  onRefetch,
  onSearch,
}: FiltersProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="backdrop-blur-lg bg-opacity-40 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <img
                src="/src/assets/news.png"
                alt="news"
                className="w-[150px]"
              />
            </div>

            <Button size="large" type="link" onClick={() => setOpen(true)}>
              <FilterOutlined className="text-2xl text-black" />
            </Button>
          </div>
        </div>
      </nav>

      <Drawer
        title=""
        placement="top"
        closable={false}
        onClose={() => setOpen(false)}
        open={open}
      >
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
              options={SOURCES}
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
      </Drawer>
    </>
  );
}
