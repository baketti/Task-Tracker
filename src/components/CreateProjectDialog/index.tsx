import * as React from "react";
import { memo } from "react";
import { useCreateProjectDialog } from "./index.hooks";
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
import { FormCustomerPicker } from "@/components/_form/FormCustomerPicker";
import { ObjectIdFe } from "@/models/common/JsUtility";

type CreateProjectDialogData = {
  name: string;
  customer: {
    id: ObjectIdFe;
    value: string;
  };
  website?: string;
  intermediary?: {
    id?: ObjectIdFe;
    value?: string;
  };
};

type CreateProjectDialogProps = {};
export const CreateProjectDialog = memo(({}: CreateProjectDialogProps) => {
  const {
    formData,
    triggerSubmit,
    submitDisabled,
    t,
    isCreatingProject,
    isCreateProjectDialogOpen,
    handleCloseDialog,
  } = useCreateProjectDialog();

  return (
    <FormProvider {...formData}>
      <Dialog open={isCreateProjectDialogOpen} onClose={handleCloseDialog}>
        <form onSubmit={triggerSubmit}>
          <DialogTitle>{t("projects.createTitle")}</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ py: 1 }}>
              <FormTextField name="name" label={t("project.name")} />
              <FormCustomerPicker
                name={"customerId"}
                label={t("project.customer")}
              />
              <FormTextField name="website" label={t("project.website")} />
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
              loading={isCreatingProject}
            >
              {t("generic.save")}
            </AppButton>
          </DialogActions>
        </form>
      </Dialog>
    </FormProvider>
  );
});
CreateProjectDialog.displayName = "CreateProjectDialog";
