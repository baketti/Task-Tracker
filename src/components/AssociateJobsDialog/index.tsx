import React, { memo } from "react";
import { useAssociateJobsDialog } from "./index.hooks";
import { Box, Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FormMultiJobPicker } from "@/components/_form/FormMultiJobPicker";
import { AppButton } from "@/components/AppButton";
import { FormProvider } from "react-hook-form";
import { Trans } from "react-i18next";

type AssociateJobsDialogProps = {};

export const AssociateJobsDialog = memo(({}: AssociateJobsDialogProps) => {
  const {
    t,
    isDialogOpen,
    onDialogClose,
    availableJobIds,
    formData,
    triggerSubmit,
    isPostingJobAssociations,
    submitDisabled,
  } = useAssociateJobsDialog();

  return (
    <Dialog open={isDialogOpen} onClose={onDialogClose}>
      <DialogTitle>
        <Typography variant="h5">
          <Trans t={t} i18nKey="job.assign" />
        </Typography>
      </DialogTitle>
      <DialogContent>
        <FormProvider {...formData}>
          <form onSubmit={triggerSubmit}>
            <Stack spacing={2}>
              <Box sx={{ height: 250, py: 1 }}>
                <Stack
                  spacing={1}
                  direction="row"
                  alignItems="center"
                  sx={{ mt: 2 }}
                >
                  {availableJobIds.length ? (
                    <FormMultiJobPicker
                      jobs={availableJobIds}
                      excludeSelected
                      name="associations"
                      label={t("job.name")}
                    />
                  ) : (
                    <Typography variant="body2" color="error">
                      {t("job.noAvailableJobs")}
                    </Typography>
                  )}
                </Stack>
              </Box>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mt: 2 }}
            >
              <AppButton
                variant="outlined"
                color="secondary"
                onClick={onDialogClose}
              >
                {t("generic.cancel")}
              </AppButton>
              <AppButton
                type="submit"
                variant="contained"
                loading={isPostingJobAssociations}
                disabled={submitDisabled}
              >
                <Trans t={t} i18nKey="job.assign" />
              </AppButton>
            </Stack>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
});
AssociateJobsDialog.displayName = "AssociateJobsDialog";
