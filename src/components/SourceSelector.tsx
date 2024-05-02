import { Select, Space } from "antd";
import type { SelectProps } from "antd";

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

const SourceSelector = () => (
  <Select
    mode="multiple"
    allowClear
    placeholder="Please select"
    onChange={handleChange}
    options={options}
  />
);

export default SourceSelector;
