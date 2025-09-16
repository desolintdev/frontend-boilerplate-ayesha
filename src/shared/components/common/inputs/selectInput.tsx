import {Controller} from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {SelectInputProps} from '@/shared/interfaces/inputs';

import ErrorMessage from './errorMessage';

function SelectInput({
  label,
  options,
  control,
  name,
  placeholder = 'Select a Type',
  ...rest
}: SelectInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {value, onChange}, fieldState: {error}}) => {
        return (
          <div className='flex flex-col relative'>
            {label && <label className='ml-[2px] mt-[3px]'>{label}</label>}
            <Select
              onValueChange={(selectedValue) => {
                onChange(selectedValue);
              }}
              value={value}
              {...rest}
            >
              <SelectTrigger className={`${error && 'border-danger'}`}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option: {value: string; label: string}) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && <ErrorMessage errorMsg={error.message} />}
          </div>
        );
      }}
    />
  );
}

export default SelectInput;
