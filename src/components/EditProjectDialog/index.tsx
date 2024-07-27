import React, { memo } from "react";
import { useEditProjectDialog } from "./index.hooks";
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
import { FormCustomerPicker } from "@/components/_form/FormCustomerPicker";

type EditProjectDialogProps = {};

export const EditProjectDialog = memo(({}: EditProjectDialogProps) => {
  const {
    t,
    formData,
    triggerSubmit,
    isEditingProject,
    isEditProjectDialogOpen,
    handleCloseDialog,
    submitDisabled,
  } = useEditProjectDialog();

  return (
    <FormProvider {...formData}>
      <Dialog open={isEditProjectDialogOpen} onClose={handleCloseDialog}>
        <form onSubmit={triggerSubmit}>
          <DialogTitle>{t("projects.editTitle")}</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ py: 1 }}>
              <FormTextField name="name" label={t("project.name")} />
              <FormTextField name="website" label={t("project.website")} />
              <FormCustomerPicker
                name={"customerId"}
                label={t("project.customer")}
              />
              <FormCustomerPicker
                name={"intermediaryId"}
                label={t("project.intermediary")}
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
              loading={isEditingProject}
            >
              {t("generic.save")}
            </AppButton>
          </DialogActions>
        </form>
      </Dialog>
    </FormProvider>
  );
});
EditProjectDialog.displayName = "EditProjectDialog";
