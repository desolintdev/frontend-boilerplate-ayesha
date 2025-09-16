"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import SubmitButton from "@/shared/components/common/buttons/submitButton";
import AuthFormContainer from "@/shared/components/common/container/AuthFormContainer";
import PasswordInput from "@/shared/components/common/inputs/passwordInput";
import useLocaleRouter from "@/shared/hooks/useLocaleRouter";
import useTranslation from "@/shared/hooks/useTranslation";
import { ResetPasswordPayload } from "@/shared/interfaces/auth";
import { userMutations } from "@/shared/reactQuery";
import { resetPasswordSchema } from "@/shared/schemas/auth";
import { AUTH_ROUTES } from "@/shared/utils/PATHS";

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useLocaleRouter();
  const { t, ct } = useTranslation();

  const { control, handleSubmit } = useForm<ResetPasswordPayload>({
    resolver: yupResolver(ct({ constant: resetPasswordSchema })),
    defaultValues: { password: "", confirmPassword: "" },
  });
  const onSuccess = () => router.push({ url: AUTH_ROUTES.login });

  const onError = () => router.push({ url: AUTH_ROUTES.forgotPassword });

  const { useResetPasswordMutation } = userMutations();

  const { mutate: executeResetPasswordMutation, isPending } =
    useResetPasswordMutation({
      callBackFuncs: { onError, onSuccess },
    });

  const onSubmit = (payload: ResetPasswordPayload) => {
    executeResetPasswordMutation({ payload, params: { token } });
  };

  return (
    <AuthFormContainer
      heading={t("auth.reset")}
      handleSubmit={handleSubmit(onSubmit)}
    >
      <PasswordInput
        name="password"
        control={control}
        label={t("auth.passwordLabel")}
        placeholder={t("auth.passwordPlaceholder")}
      />
      <PasswordInput
        label={t("auth.confirmPassword")}
        placeholder={t("auth.confirmPasswordPlaceholder")}
        name="confirmPassword"
        control={control}
      />
      <SubmitButton loading={isPending} buttonText={t("auth.reset")} />
    </AuthFormContainer>
  );
}
