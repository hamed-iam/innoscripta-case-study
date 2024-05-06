import { Button, DatePicker, Drawer, Select } from "antd";
import { CATEGORIES, SOURCES } from "../constants";
import { useState } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "./CustomInput";
import dayjs from "dayjs";

interface FiltersProps {
  loading: boolean;
  onSubmit: SubmitHandler<FieldValues>;
}

export default function Filters({ loading, onSubmit }: FiltersProps) {
  const [open, setOpen] = useState(false);
  const { handleSubmit, setValue, control, watch } = useForm();

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex flex-col gap-4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
              <CustomInput
                name="search"
                control={control}
                placeholder="Search news"
                type="text"
              />
              <Select
                onChange={(e) => setValue("category", e)}
                placeholder="Select category"
                options={CATEGORIES}
              />

              <Select
                mode="multiple"
                allowClear
                placeholder="Select Sources"
                loading={loading}
                onChange={(e) => setValue("source", e)}
                options={SOURCES}
              />
              <DatePicker
                onChange={(_, e) => setValue("from", e)}
                placeholder="From"
                disabledDate={(e) => dayjs().isBefore(e)}
              />
              <DatePicker
                onChange={(_, e) => setValue("to", e)}
                placeholder="To"
                disabled={!watch("from")}
                disabledDate={(e) =>
                  dayjs(e).isBefore(watch("from")) ||
                  dayjs(e).isAfter(dayjs().endOf("day"))
                }
              />

              <Button htmlType="submit">Search</Button>
            </div>
          </div>
        </form>
      </Drawer>
    </>
  );
}
