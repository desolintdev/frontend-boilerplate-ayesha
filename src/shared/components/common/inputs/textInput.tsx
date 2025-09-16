import { Controller } from "react-hook-form";

import { Input } from "@/shared/components/ui/input";
import { TextInputProps } from "@/shared/interfaces/inputs";

import ErrorMessage from "./errorMessage";

const TextInput = ({ control, name, label, placeholder }: TextInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col relative">
          {label && <label className="ml-[2px] mt-[3px]">{label}</label>}
          <Input
            {...field}
            placeholder={placeholder}
            className={error && "border-error focus-visible:ring-error"}
          />
          {error && <ErrorMessage errorMsg={error.message} />}
        </div>
      )}
    />
  );
};

export default TextInput;
