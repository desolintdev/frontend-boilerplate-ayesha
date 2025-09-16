import useLocaleRouter from "@/shared/hooks/useLocaleRouter";
import useTranslation from "@/shared/hooks/useTranslation";
import { VerificationMessageProps } from "@/shared/interfaces/auth";
import { userMutations } from "@/shared/reactQuery";
import { AUTH_ROUTES } from "@/shared/utils/PATHS";

const VerificationMessage = ({
  message,
  unsuccessful,
  successful,
  email,
}: VerificationMessageProps) => {
  const router = useLocaleRouter();
  const { t } = useTranslation();
  const { useResendVerificationMutation } = userMutations();

  const { mutate: executeResendPasswordMutation, isPending } =
    useResendVerificationMutation();

  const resendLink = async () => {
    executeResendPasswordMutation({ payload: email });
  };

  return (
    <div>
      {message && (
        <>
          <p>{message}</p>
          <button disabled={isPending} onClick={resendLink}>
            {!isPending ? t("auth.newlink") : t("auth.loader")}
          </button>
        </>
      )}
      {successful && (
        <>
          {successful}
          <button onClick={() => router.push({ url: AUTH_ROUTES.login })}>
            {t("auth.clickLogin")}
          </button>
        </>
      )}
      {unsuccessful && (
        <>
          {unsuccessful}
          <button onClick={resendLink}>{t("auth.getNewlink")}</button>
        </>
      )}
    </div>
  );
};

export default VerificationMessage;
