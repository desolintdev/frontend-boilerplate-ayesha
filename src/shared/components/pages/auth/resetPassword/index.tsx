"use client";

import { useEffect, useState, useCallback } from "react";

import { jwtDecode } from "jwt-decode";

import GlobalLoader from "@/shared/components/common/loaders/GlobalLoader";
import useTranslation from "@/shared/hooks/useTranslation";
import { tryCatch } from "@/shared/utils/tryCatchUtils";

import ResetPasswordForm from "./resetPasswordForm";

const InvalidTokenMessage = ({ message }: { message: string }) => {
  return <h4>{message}</h4>;
};

const ResetPasswordHandler = ({ token }: { token: string }) => {
  const [tokenError, setTokenError] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const { t } = useTranslation();

  const verifyToken = useCallback(() => {
    const { success } = tryCatch({ fn: () => jwtDecode(token) });
    if (!success) {
      setTokenError(true);
    }
    setInitialRender(false);
  }, [token]); // Only re-create when `token` changes

  useEffect(() => {
    if (initialRender) {
      verifyToken();
    }
  }, [initialRender, verifyToken]);

  if (initialRender) return <GlobalLoader />;

  if (tokenError)
    return <InvalidTokenMessage message={t("auth.invalidToken")} />;

  return <ResetPasswordForm token={token} />;
};

export default ResetPasswordHandler;
