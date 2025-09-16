import useTranslation from "@/shared/hooks/useTranslation";
import { ConfirmationModalProps } from "@/shared/interfaces/dialogs";

import { GeneralModal } from "./GeneralModal";

export const ConfirmationModal = ({
  title,
  isOpen,
  setIsOpen,
  dismissLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  confirmLoading,
  buttons,
}: ConfirmationModalProps) => {
  const { t } = useTranslation();

  return (
    <GeneralModal
      title={title}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      buttons={
        buttons || [
          {
            title: dismissLabel || t("modalButtons.cancelLabel"),
            handleClick: onCancel,
            variant: "destructive",
            loading: false,
            styles: "w-full",
          },
          {
            title: confirmLabel || t("modalButtons.confirmLabel"),
            handleClick: onConfirm,
            variant: "default",
            loading: confirmLoading,
            styles: "w-full",
          },
        ]
      }
    />
  );
};
