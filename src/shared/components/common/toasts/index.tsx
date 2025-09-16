import {
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from "@/shared/components/icons";
import { ToasterComponentProps } from "@/shared/interfaces/common";

import styles from "./styles.module.css";

export const ToasterComponent = ({
  type,
  title,
  message,
  onClose = () => {},
}: ToasterComponentProps) => {
  const getIcon = ({ type }: { type: ToasterComponentProps["type"] }) => {
    switch (type) {
      case "success":
        return <SuccessIcon />;
      case "error":
        return <ErrorIcon />;
      case "warning":
        return <WarningIcon />;
      case "info":
        return <InfoIcon />;
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      {/* Left-side Icon */}
      <div className={styles.type_left}>
        <i className={styles.icon_left}>{getIcon({ type })}</i>
      </div>

      {/* Title and Message */}
      <div className={styles.toast_content}>
        <div className={styles.title}>{`${title} !`}</div>
        <div className={styles.message}>{message}</div>
      </div>

      {/* Close Icon */}
      <i className={styles.close_icon} onClick={onClose}>
        <CloseIcon />
      </i>

      <div className={styles.type_element}>
        <i className={styles.icon_right}>{getIcon({ type })}</i>
      </div>
    </div>
  );
};
