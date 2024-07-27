import { useCreateCustomerDialog } from "./index.hooks";
import React, { memo } from "react";
import { FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { FormTextField } from "@/components/_form/FormTextField";
import { AppButton } from "@/components/AppButton";

type CreateCustomerDialogProps = {};

export const CreateCustomerDialog = memo(({}: CreateCustomerDialogProps) => {
  const {
    formData,
    triggerSubmit,
    submitDisabled,
    t,
    isCreatingCustomer,
    isCreateCustomerDialogOpen,
    handleCloseDialog,
  } = useCreateCustomerDialog();

  return (
    <FormProvider {...formData}>
      <Dialog open={isCreateCustomerDialogOpen} onClose={handleCloseDialog}>
        <form onSubmit={triggerSubmit}>
          <DialogTitle>{t("customers.createTitle")}</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ py: 1 }}>
              <FormTextField name="name" label={t("customers.name")} />
              <FormTextField name="logoUrl" label={t("customers.logoUrl")} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <AppButton
              variant="outlined"
              color="secondary"
              onClick={handleCloseDialog}
            >
              {t("generic.cancel")}
            </AppButton>
            <AppButton
              variant="contained"
              type="submit"
              disabled={submitDisabled}
              loading={isCreatingCustomer}
            >
              {t("generic.save")}
            </AppButton>
          </DialogActions>
        </form>
      </Dialog>
    </FormProvider>
  );
});
CreateCustomerDialog.displayName = "CreateCustomerDialog";
