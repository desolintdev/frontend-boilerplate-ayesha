import { ReactNode } from "react";

import { LinkProps } from "next/link";
import { IconType } from "react-icons";
import { ToastPosition } from "react-toastify";

export interface SidebarRoute {
  value: string;
  label: string;
  path: string;
  icon: IconType;
}

export interface SiteMapLink {
  url: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  lastModified: Date;
}

export interface LocaleLinkProps extends Omit<LinkProps, "href"> {
  href: string;
  children: ReactNode;
}

export interface RequestParams {
  endpoint: string;
  payload?: any;
}

export interface ShowToastProps {
  type?: "info" | "success" | "warning" | "error";
  message: string;
  id?: string | number;
  position?: ToastPosition | null | undefined;
}

export interface ServerRequestParams {
  endpoint: string;
  cookieHeader?: string;
}
