import * as Yup from "yup";

import { TranslateFunction } from "@/shared/types/common";

const commonFieldsSchema = ({ t }: { t: TranslateFunction }) => ({
  email: Yup.string()
    .email(t("authValidation.emailInvalid"))
    .required(t("authValidation.emailRequired")),
  password: Yup.string()
    .required(t("authValidation.passwordRequired"))
    .min(8, t("authValidation.passwordMin"))
    .matches(/[A-Z]/, t("authValidation.passwordUppercase")),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password") as unknown as string, undefined],
      t("authValidation.passwordsMustMatch"),
    )
    .required(t("authValidation.confirmPasswordRequired")),
});

// Login Schema
export const loginUserSchema = ({ t }: { t: TranslateFunction }) =>
  Yup.object().shape({
    email: commonFieldsSchema({ t }).email,
    password: commonFieldsSchema({ t }).password,
  });

// Registration Schema
export const registerUserSchema = ({ t }: { t: TranslateFunction }) =>
  Yup.object().shape({
    email: commonFieldsSchema({ t }).email,
    password: commonFieldsSchema({ t }).password,

    // confirmPassword: commonFieldsSchema({t}).confirmPassword,
    firstName: Yup.string()
      .min(1, t("authValidation.firstNameMin"))
      .max(255, t("authValidation.firstNameMax"))
      .required(t("authValidation.firstNameRequired")),
    lastName: Yup.string()
      .min(1, t("authValidation.lastNameMin"))
      .max(255, t("authValidation.lastNameMax"))
      .required(t("authValidation.lastNameRequired")),
  });

// Send Reset Password Link Schema
export const sendResetPasswordLinkSchema = ({ t }: { t: TranslateFunction }) =>
  Yup.object().shape({
    email: commonFieldsSchema({ t }).email,
  });

// Reset Password Schema
export const resetPasswordSchema = ({ t }: { t: TranslateFunction }) =>
  Yup.object().shape({
    password: commonFieldsSchema({ t }).password,
    confirmPassword: commonFieldsSchema({ t }).confirmPassword,
  });
