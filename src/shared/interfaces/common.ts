import { Dispatch, FormEventHandler, ReactNode, SetStateAction } from "react";

import { IconBaseProps } from "react-icons";

export interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export interface GlobalErrorProps {
  error: Error;
  statusCode?: number;
}

export interface NodeChildrenProps {
  children: ReactNode;
}

export interface FullWidthContainerProps {
  children: ReactNode;
  className?: string;
}

export interface AuthFormContainerProps {
  children: ReactNode;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  heading: string;
  formStyles?: string;
}

export interface ToasterComponentProps {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  onClose?: () => void;
}

export interface IconProps extends IconBaseProps {
  size?: string | number;
  color?: string;
  className?: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ReactPrefetchQueryProviderProps {
  queriesToFetch?: any[]; // Replace 'any[]' with a specific type if possible
  children: ReactNode;
}

export interface AppContextType {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  isUserAuthenticated: boolean;
  setIsUserAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export interface ScriptLoaderProps {
  src: string;
  maxRetries?: number;
  retryDelay?: number;
  strategy?: "lazyOnload" | "afterInteractive" | "beforeInteractive" | "worker";
}
