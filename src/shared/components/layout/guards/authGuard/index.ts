"use client";

import { ReactNode, useEffect } from "react";

import { useSelector } from "react-redux";

import useLocaleRouter from "@/shared/hooks/useLocaleRouter";
import useRouteType from "@/shared/hooks/useRouterType";
import { NodeChildrenProps } from "@/shared/interfaces/common";
import { getCurrentUser } from "@/shared/redux/slices/users";
import { AUTH_ROUTES, DASHBOARD_ROUTES } from "@/shared/utils/PATHS";

const AuthGuard = ({ children }: NodeChildrenProps): ReactNode => {
  const { isAuthRoute, isDashboardRoute } = useRouteType();
  const router = useLocaleRouter();
  const currentUser = useSelector(getCurrentUser);
  const isLoggedIn = Boolean(currentUser?._id);

  useEffect(() => {
    if (!isLoggedIn && isDashboardRoute) {
      router.push({ url: AUTH_ROUTES.login });
    } else if (isLoggedIn && isAuthRoute) {
      router.push({ url: DASHBOARD_ROUTES.home });
    }
  }, [isLoggedIn, isAuthRoute, isDashboardRoute, router]);

  return children;
};

export default AuthGuard;
