import React, { memo } from "react";
import { FormProvider } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { FormTextField } from "@/components/_form/FormTextField";
import { AppButton } from "@/components/AppButton";
import { useEditWorkerDialog } from "@/components/EditWorkerDialog/index.hooks";
import { FormMultiJobPicker } from "@/components/_form/FormMultiJobPicker";
import { FormSwitch } from "@/components/_form/FormSwitch";
import { FormDatePicker } from "@/components/_form/FormDatePicker";

type EditWorkerDialogProps = {};

export const EditWorkerDialog = memo(({}: EditWorkerDialogProps) => {
  const {
    formData,
    triggerSubmit,
    submitDisabled,
    t,
    isEditingWorker,
    isEditWorkerDialogOpen,
    handleCloseDialog,
    jobs,
    isInternshipEnabled,
  } = useEditWorkerDialog();

  return (
    <FormProvider {...formData}>
      <Dialog
        fullScreen
        open={isEditWorkerDialogOpen}
        onClose={handleCloseDialog}
      >
        <form onSubmit={triggerSubmit}>
          <DialogTitle>{t("workers.editTitle")}</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ py: 1 }}>
              <FormTextField name="fullName" label={t("workers.name")} />
              <FormMultiJobPicker
                jobs={jobs}
                excludeSelected
                name="enabledJobIds"
                label={t("job.name")}
              />
              <FormSwitch
                name={"enableInternship"}
                label={t("workers.enableInternship")}
              />
              {isInternshipEnabled && (
                <>
                  <FormTextField
                    name={"totalHours"}
                    label={t("workers.totalHours")}
                    type="number"
                  />
                  <FormDatePicker
                    name={"startDate"}
                    label={t("workers.startDate")}
                  />
                </>
              )}
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
              loading={isEditingWorker}
            >
              {t("generic.save")}
            </AppButton>
          </DialogActions>
        </form>
      </Dialog>
    </FormProvider>
  );
});

EditWorkerDialog.displayName = "EditWorkerDialog";
