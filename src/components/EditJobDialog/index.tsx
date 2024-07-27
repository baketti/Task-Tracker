import React, { memo } from "react";
import { useEditJobDialog } from "./index.hooks";
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
import { FormProjectPicker } from "@/components/_form/FormProjectPicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

type EditJobDialogProps = {};

export const EditJobDialog = memo(({}: EditJobDialogProps) => {
  const {
    formData,
    t,
    handleCloseDialog,
    triggerSubmit,
    isEditingJob,
    isEditJobDialogOpen,
    submitDisabled,
  } = useEditJobDialog();

  return (
    <FormProvider {...formData}>
      <Dialog open={isEditJobDialogOpen} onClose={handleCloseDialog}>
        <form onSubmit={triggerSubmit}>
          <DialogTitle>{t("jobs.editTitle")}</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ py: 1 }}>
              <FormTextField name="name" label={t("job.name")} />
              <FormProjectPicker name={"projectId"} label={t("project.name")} />
              <FormControlLabel
                control={<Checkbox defaultChecked name={"isActive"} />}
                label={t("check.active")}
              />
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
              loading={isEditingJob}
            >
              {t("generic.save")}
            </AppButton>
          </DialogActions>
        </form>
      </Dialog>
    </FormProvider>
  );
});
EditJobDialog.displayName = "EditJobDialog";
