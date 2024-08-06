import React, { memo } from "react";
import { FormProvider } from "react-hook-form";
import { useLoginForm } from "./index.hooks";
import { Stack, Typography } from "@mui/material";
import { FormTextField } from "@/components/_form/FormTextField";
import { AppButton } from "../AppButton";
import { FormPassword } from "../_form/FormPassword";
import { Link } from "react-router-dom";

type LoginFormProps = {};

export const LoginForm = memo(({}: LoginFormProps) => {
  const {
    formData,
    triggerSubmit,
    submitDisabled,
    t,
    isLoginAjaxLoading,
    languageCode,
  } = useLoginForm();

  return (
    <FormProvider {...formData}>
      <form onSubmit={triggerSubmit}>
        <Stack spacing={3} color="primary">
          <FormTextField name="email" label="Email" type="email" />
          <FormPassword name="password" label="Password" />
          <Stack alignItems="center">
            <Link
              style={{ width: "max-content" }}
              to={isLoginAjaxLoading ? ""
                  : `/${languageCode}/app/authentication/registration`
              }
            >
              <Typography sx={{ "&:hover": { textDecoration: "underline" } }}>
                {t("authentication.register")}
              </Typography>
            </Link>
          </Stack>
          <AppButton
            variant="contained"
            type="submit"
            disabled={submitDisabled}
            loading={isLoginAjaxLoading}
          >
            {t("authentication.login")}
          </AppButton>
        </Stack>
      </form>
    </FormProvider>
  );
});
LoginForm.displayName = "LoginForm";
