import {ReactNode} from 'react';

export interface PrimaryButtonProps {
  buttonText: string | ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
  styles?: string;
}

export interface SubmitButtonProps {
  buttonText: string;
  loading?: boolean;
}
