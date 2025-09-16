export interface TextInputProps {
  label?: string;
  placeholder?: string;
  control: any;
  name: string;
}

export interface SelectInputProps {
  label?: string;
  options: {value: any; label: string}[];
  control: any;
  name: string;
  placeholder?: string;
  [key: string]: any;
}

export interface ErrorMessageProps {
  errorMsg?: string;
}

interface SortOption {
  value: string;
  label: string;
}

interface SortConfig {
  options: Record<string, SortOption>;
  directions: Record<string, string>;
}

export interface SortSelectsProps {
  sortValue: any;
  sortConfig?: SortConfig;
  setSortField: (field: string) => void;
  setDirection: (direction: string) => void;
}
