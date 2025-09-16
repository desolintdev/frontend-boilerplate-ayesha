"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import SubmitButton from "@/shared/components/common/buttons/submitButton";
import AuthFormContainer from "@/shared/components/common/container/AuthFormContainer";
import TextInput from "@/shared/components/common/inputs/textInput";
import useLocaleRouter from "@/shared/hooks/useLocaleRouter";
import useTranslation from "@/shared/hooks/useTranslation";
import { ForgotPasswordPayload } from "@/shared/interfaces/auth";
import { userMutations } from "@/shared/reactQuery";
import { sendResetPasswordLinkSchema } from "@/shared/schemas/auth";
import { AUTH_ROUTES } from "@/shared/utils/PATHS";

export default function ForgotPasswordForm() {
  const { t, ct } = useTranslation();
  const router = useLocaleRouter();

  const onSuccess = () => {
    router.push({ url: AUTH_ROUTES.resetPasswordRequest });
  };
  const onError = () => {};

  const { useSendResetPasswordMutation } = userMutations();

  const { mutate: executeSendResetPasswordMutation, isPending } =
    useSendResetPasswordMutation({
      callBackFuncs: { onError, onSuccess },
    });

  const { control, handleSubmit } = useForm<ForgotPasswordPayload>({
    resolver: yupResolver(ct({ constant: sendResetPasswordLinkSchema })),
    defaultValues: { email: "" },
  });

  const onSubmit = (payload: ForgotPasswordPayload) => {
    executeSendResetPasswordMutation({ payload });
  };

  return (
    <AuthFormContainer
      heading={t("auth.forgot")}
      handleSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        name="email"
        label={t("auth.emailLabel")}
        control={control}
        placeholder={t("auth.emailPlaceholder")}
      />
      <SubmitButton loading={isPending} buttonText={t("auth.sendEmail")} />
    </AuthFormContainer>
  );
}
