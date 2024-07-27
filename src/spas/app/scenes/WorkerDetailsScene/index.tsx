import React, { memo } from "react";
import { useWorkerDetailsScene } from "./index.hooks";
import { DataGrid } from "@mui/x-data-grid";
import {
  Paper,
  Stack,
  Typography,
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import CableRoundedIcon from "@mui/icons-material/CableRounded";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { AssociateJobsDialog } from "@/components/AssociateJobsDialog";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Trans } from "react-i18next";

type WorkerDetailsSceneProps = {};

/* trovare il modo per mostrare la data in base alla lingua corrente */

export const WorkerDetailsScene = memo(({}: WorkerDetailsSceneProps) => {
  const {
    workerRows,
    isLoadingWorker,
    columns,
    worker,
    t,
    onAssociateJobsButtonClick,
    isAssociateJobDialogOpen,
    RemoveJobAssociationDialog,
  } = useWorkerDetailsScene();

  if (isLoadingWorker) {
    return (
      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        <Box>
          <CircularProgress />
        </Box>
      </Stack>
    );
  }

  return (
    <>
      <Stack spacing={2} sx={{ my: -2, height: "100%" }}>
        {!worker && <Typography>{t("worker.notFound")}</Typography>}
        <Paper sx={{ height: "fit-content", alignItems: "center", p: 2 }}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography>{worker?.fullName}</Typography>
            {worker?.isIntern ? (
              <>
                {worker?.hours ? (
                  <Typography>
                    {t("generic.hours")}: {worker?.hours}
                  </Typography>
                ) : null}
                {!!worker?.startDate && (
                  <Typography>
                    {t("generic.start")}: {worker?.startDate}
                  </Typography>
                )}
              </>
            ) : (
              <Typography>{t("worker.notEnabled")}</Typography>
            )}
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Button
                variant="contained"
                startIcon={<CableRoundedIcon />}
                onClick={onAssociateJobsButtonClick}
                disabled={!worker?.isIntern}
              >
                <Trans t={t} i18nKey="job.assign" />
              </Button>
            </Stack>
          </Stack>
        </Paper>
        <Paper></Paper>
        <Paper sx={{ height: "100%" }}>
          <DataGrid columns={columns} rows={workerRows} sx={{ flex: 1 }} />
        </Paper>
        {isAssociateJobDialogOpen && <AssociateJobsDialog />}
      </Stack>
      {RemoveJobAssociationDialog}
    </>
  );
});

WorkerDetailsScene.displayName = "WorkerDetailsScene";
