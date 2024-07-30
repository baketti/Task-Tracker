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
import { Widget } from "@/components/Widget";

type WorkerDetailsSceneProps = {};

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
      <Widget
        sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography>{worker?.fullName}</Typography>
          {worker?.isIntern ? (
            <>
              {worker?.hours ? (
                <Typography sx={{display:{xs:'none',sm:'flex'}}}>
                  {t("generic.hours")}: {worker?.hours}
                </Typography>
              ) : null}
              {!!worker?.startDate && (
                <Typography sx={{display:{xs:'none',sm:'flex'}}}>
                  {t("generic.start")}: {worker?.startDate}
                </Typography>
              )}
            </>
          ) : (
            <Typography sx={{display:{xs:'none',sm:'flex'}}}>
              {t("worker.notEnabled")}
            </Typography>
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
        <Stack spacing={2} sx={{ width: "100%", display: "grid", flex: 1 }}>
          <DataGrid columns={columns} rows={workerRows} />
        </Stack>
      </Widget>
      {isAssociateJobDialogOpen && <AssociateJobsDialog />}
      {RemoveJobAssociationDialog}
    </>
  );
});

WorkerDetailsScene.displayName = "WorkerDetailsScene";