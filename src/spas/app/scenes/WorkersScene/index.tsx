import React, { memo } from "react";
import { useWorkersScene } from "./index.hooks";
import { Button, Paper, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import { CreateWorkerDialog } from "@/components/CreateWorkerDialog";
import { EditWorkerDialog } from "@/components/EditWorkerDialog";
import { Widget } from "@/components/Widget";

type WorkersSceneProps = {};

export const WorkersScene = memo(({}: WorkersSceneProps) => {
  const {
    columns,
    t,
    handleOpenCreateWorkerDialog,
    workersRows,
    DeleteWorkerDialog,
  } = useWorkersScene();

  return (
    <>
      <Widget
        sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Button
          sx={{ alignSelf: "flex-end", maxWidth: "240px" }}
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleOpenCreateWorkerDialog}
        >
          {t("workers.createTitle")}
        </Button>
        <Stack spacing={2} sx={{ width: "100%", display: "grid", flex: 1 }}>
          <DataGrid
            columns={columns}
            rows={workersRows}
            sx={{ flex: 1 }}
            autoPageSize
          />
        </Stack>
      </Widget>
      <CreateWorkerDialog />
      <EditWorkerDialog />
      {DeleteWorkerDialog}
    </>
  );
});

WorkersScene.displayName = "WorkersScene";
