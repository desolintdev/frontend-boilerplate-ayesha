import { useState } from "react";

import { Controller } from "react-hook-form";

import ErrorMessage from "@/shared/components/common/inputs/errorMessage";
import { EyeIcon, EyeSlashIcon } from "@/shared/components/icons";
import { Input } from "@/shared/components/ui/input";
import { TextInputProps } from "@/shared/interfaces/inputs";

const PasswordInput = ({
  control,
  name,
  label,
  placeholder,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative">
          {label && <label className="ml-[2px] mt-[3px]">{label}</label>}
          <div className="relative">
            <Input
              {...field}
              type={showPassword ? "text" : "password"}
              className={error && "border-error focus-visible:ring-error"}
              placeholder={placeholder}
            />
            <button
              className="absolute top-[12px] right-[10px]"
              onClick={togglePasswordVisibility}
              type="button"
            >
              {showPassword ? (
                <EyeSlashIcon size={18} />
              ) : (
                <EyeIcon size={18} />
              )}
            </button>
          </div>
          {error && <ErrorMessage errorMsg={error.message} />}
        </div>
      )}
    />
  );
};

export default PasswordInput;
