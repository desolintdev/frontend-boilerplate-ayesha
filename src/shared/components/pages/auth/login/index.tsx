"use client";

import { useCallback } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import SubmitButton from "@/shared/components/common/buttons/submitButton";
import AuthFormContainer from "@/shared/components/common/container/AuthFormContainer";
import PasswordInput from "@/shared/components/common/inputs/passwordInput";
import TextInput from "@/shared/components/common/inputs/textInput";
import { USER_ERRORS_TYPES } from "@/shared/constants/responses/errors/users";
import useLocaleRouter from "@/shared/hooks/useLocaleRouter";
import useTranslation from "@/shared/hooks/useTranslation";
import { LoginError, LoginPayload } from "@/shared/interfaces/auth";
import { userMutations } from "@/shared/reactQuery";
import { loginUserSchema } from "@/shared/schemas/auth";
import Link from "@/shared/utils/localeLink";
import { AUTH_ROUTES, DASHBOARD_ROUTES } from "@/shared/utils/PATHS";

export default function LoginForm() {
  const { t, ct } = useTranslation();
  const router = useLocaleRouter();
  const searchParams = useSearchParams();
  const { useLoginMutation } = userMutations();

  const createQueryString = useCallback(
    ({ name, value }: { name: string; value: string }) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const onSuccess = (
    {
      // data,
      // statusCode,
      // message,
    },
  ) => {
    router.push({ url: DASHBOARD_ROUTES.home });
  };

  const onError = ({ error: { type, email } = {} }: LoginError) => {
    if (type === USER_ERRORS_TYPES.userNotVerified.value) {
      router.push({
        url: `${AUTH_ROUTES.unverifiedLoginAttempt}?${createQueryString({
          name: "email",
          value: email || "",
        })}`,
      });
    }
  };

  const {
    mutate: executeLoginMutation,
    isPending,

    // statusCode,
    // message,
    // error,
    // data,
  } = useLoginMutation({
    callBackFuncs: { onError, onSuccess },
  });

  const { control, handleSubmit } = useForm<LoginPayload>({
    resolver: yupResolver(ct({ constant: loginUserSchema })),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (payload: LoginPayload) => {
    executeLoginMutation({
      payload,
    });
  };

  return (
    <AuthFormContainer
      heading={t("auth.login")}
      handleSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        name="email"
        label={t("auth.emailLabel")}
        control={control}
        placeholder={t("auth.emailPlaceholder")}
      />
      <PasswordInput
        name="password"
        control={control}
        label={t("auth.passwordLabel")}
        placeholder={t("auth.passwordPlaceholder")}
      />
      <SubmitButton loading={isPending} buttonText={t("auth.loginText")} />
      <Link href={AUTH_ROUTES.forgotPassword}>{t("auth.forgot")}</Link>
      <p>
        {t("auth.isNotMember")}
        <Link href={AUTH_ROUTES.register}> {t("auth.register")}</Link>
      </p>
    </AuthFormContainer>
  );
}
