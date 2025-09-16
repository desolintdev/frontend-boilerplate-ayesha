import useTranslation from "@/shared/hooks/useTranslation";
import { ErrorModalProps } from "@/shared/interfaces/dialogs";

import { GeneralModal } from "./GeneralModal";

export const ErrorModal = ({
  title,
  setIsOpen,
  onConfirm,
  isOpen,
  label,
  content,
}: ErrorModalProps) => {
  const { t } = useTranslation();

  return (
    <GeneralModal
      title={title}
      content={content}
      buttons={[
        {
          title: label || t("modalButtons.confirmLabel"),
          handleClick: onConfirm,
          variant: "destructive",
        },
      ]}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
};
