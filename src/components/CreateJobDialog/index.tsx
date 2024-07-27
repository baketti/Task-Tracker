import React, { memo } from "react";
import { useCreateJobDialog } from "./index.hooks";
import { FormProvider } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { FormTextField } from "@/components/_form/FormTextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormProjectPicker } from "@/components/_form/FormProjectPicker";
import { AppButton } from "@/components/AppButton";
import Checkbox from "@mui/material/Checkbox";

type CreateJobDialogProps = {};

export const CreateJobDialog = memo(({}: CreateJobDialogProps) => {
  const {
    formData,
    triggerSubmit,
    submitDisabled,
    t,
    isCreatingJob,
    isCreateJobDialogOpen,
    handleCloseDialog,
  } = useCreateJobDialog();

  return (
    <FormProvider {...formData}>
      <Dialog open={isCreateJobDialogOpen} onClose={handleCloseDialog}>
        <form onSubmit={triggerSubmit}>
          <DialogTitle>{t("job.add")}</DialogTitle>
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
              loading={isCreatingJob}
            >
              {t("generic.save")}
            </AppButton>
          </DialogActions>
        </form>
      </Dialog>
    </FormProvider>
  );
});
CreateJobDialog.displayName = "CreateJobDialog";
