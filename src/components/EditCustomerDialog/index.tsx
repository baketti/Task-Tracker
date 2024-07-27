import React, { memo } from "react";
import { FormProvider } from "react-hook-form";
import { useEditCustomerDialog } from "./index.hooks";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { FormTextField } from "@/components/_form/FormTextField";
import { AppButton } from "@/components/AppButton";

type EditCustomerDialogProps = {};

export const EditCustomerDialog = memo(({}: EditCustomerDialogProps) => {
  const {
    formData,
    triggerSubmit,
    submitDisabled,
    t,
    isEditingCustomer,
    isEditCustomerDialogOpen,
    handleCloseDialog,
  } = useEditCustomerDialog();

  return (
    <FormProvider {...formData}>
      <Dialog open={isEditCustomerDialogOpen} onClose={handleCloseDialog}>
        <form onSubmit={triggerSubmit}>
          <DialogTitle>{t("customers.editTitle")}</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ py: 1 }}>
              <FormTextField name="name" label={t("customers.name")} />
              <FormTextField name="logoUrl" />
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
              loading={isEditingCustomer}
            >
              {t("generic.save")}
            </AppButton>
          </DialogActions>
        </form>
      </Dialog>
    </FormProvider>
  );
});
EditCustomerDialog.displayName = "EditCustomerDialog";
