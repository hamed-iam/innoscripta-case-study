import { Button, DatePicker, Drawer, Select } from "antd";
import { CATEGORIES, SOURCES } from "../constants";
import { useState } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "./CustomInput";
import dayjs from "dayjs";

interface FiltersProps {
  loading?: boolean;
  onSubmit: SubmitHandler<FieldValues>;
}

export default function Filters({ onSubmit }: FiltersProps) {
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
        placement="top"
        closable={false}
        onClose={() => setOpen(false)}
        open={open}
      >
        <div className="flex flex-col md:flex-row w-full md:px-12 space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-2/4">
            <p className="text-xl mb-2">Preference</p>
            <Select
              mode="multiple"
              allowClear
              className="w-full mb-2"
              placeholder="Select Source"
              onChange={() => {}}
              options={SOURCES}
            />

            <Button>Save</Button>
          </div>

          <form
            className="w-full md:w-2/4 flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <CustomInput
              name="search"
              control={control}
              placeholder="Search news"
              type="text"
            />
            <div className="flex flex-wrap justify-center gap-4">
              <Select
                onChange={(e) => setValue("category", e)}
                placeholder="Select category"
                options={CATEGORIES}
              />

              <div className="flex gap-4">
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
              </div>

              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </div>
          </form>
        </div>
      </Drawer>
    </>
  );
}
