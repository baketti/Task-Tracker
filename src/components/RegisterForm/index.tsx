import React, { memo } from "react";
import { FormProvider } from "react-hook-form";
import { useRegisterForm } from "./index.hooks";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FormPassword } from "../_form/FormPassword";
import { FormTextField } from "../_form/FormTextField";
import { AppButton } from "../AppButton";
import { FormSelect } from "../_form/FormSelect";

type RegisterFormProps = {};

export const RegisterForm = memo(({}: RegisterFormProps) => {
  const {
    t,
    userRoleOptions,
    formData,
    triggerSubmit,
    isPostUserAjaxLoading,
    submitDisabled,
    languageCode,
  } = useRegisterForm();

  return (
    <FormProvider {...formData}>
      <form onSubmit={triggerSubmit}>
        <Stack spacing={2}>
          <FormTextField name="email" label="Email" type="email" />
          <FormSelect name="role" label={t("role")} options={userRoleOptions} />
          <FormPassword name="password" label="Password" />
          <FormPassword name="confirmPassword" label={t("password.confirm")} />
          <Stack alignItems="center">
            <Link
              style={{ width: "max-content" }}
              to={
                isPostUserAjaxLoading
                  ? ""
                  : `/${languageCode}/app/authentication/login`
              }
            >
              <Typography sx={{ "&:hover": { textDecoration: "underline" } }}>
                {t("auth.login")}
              </Typography>
            </Link>
          </Stack>
          <AppButton
            variant="contained"
            type="submit"
            disabled={submitDisabled}
            loading={isPostUserAjaxLoading}
          >
            {t("sign.up")}
          </AppButton>
        </Stack>
      </form>
    </FormProvider>
  );
});
RegisterForm.displayName = "RegisterForm";
