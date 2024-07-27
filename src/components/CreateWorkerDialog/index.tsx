import React, { memo } from "react";
import { useCreateWorkerDialog } from "./index.hooks";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { FormTextField } from "@/components/_form/FormTextField";
import { AppButton } from "@/components/AppButton";
import { FormProvider } from "react-hook-form";

type CreateWorkerDialogProps = {};

export const CreateWorkerDialog = memo(({}: CreateWorkerDialogProps) => {
  const {
    formData,
    triggerSubmit,
    submitDisabled,
    t,
    isCreatingWorker,
    isCreateWorkerDialogOpen,
    handleCloseDialog,
  } = useCreateWorkerDialog();

  return (
    <FormProvider {...formData}>
      <Dialog open={isCreateWorkerDialogOpen} onClose={handleCloseDialog}>
        <form onSubmit={triggerSubmit}>
          <DialogTitle>{t("workers.createTitle")}</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ py: 1 }}>
              <FormTextField name="fullName" label={t("workers.fullName")} />
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
              loading={isCreatingWorker}
            >
              {t("generic.save")}
            </AppButton>
          </DialogActions>
        </form>
      </Dialog>
    </FormProvider>
  );
});
CreateWorkerDialog.displayName = "CreateWorkerDialog";
