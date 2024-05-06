import { Controller } from "react-hook-form";
import { Input } from "antd";

export interface CustomInputProps {
  label?: string;
  control: any;
  name: string;
  rules?: Record<string, any>;
  placeholder: string;
  type: string;
}

const CustomInput = ({
  label,
  type = "text",
  placeholder = "Search",
  ...rest
}: CustomInputProps) => {
  return (
    <div className="input-container">
      {label && <label>{label}</label>}
      <Controller
        name={rest.name}
        control={rest.control}
        rules={rest.rules}
        render={({ field }) => (
          <Input {...field} type={type} placeholder={placeholder} />
        )}
      />
    </div>
  );
};

export default CustomInput;
