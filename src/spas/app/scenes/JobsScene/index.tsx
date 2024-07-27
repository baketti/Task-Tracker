import React, { memo } from "react";
import { useJobsScene } from "./index.hooks";
import { Button, Paper, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import { CreateJobDialog } from "@/components/CreateJobDialog";
import { EditJobDialog } from "@/components/EditJobDialog";
import { Widget } from "@/components/Widget";

type JobsSceneProps = {};

export const JobsScene = memo(({}: JobsSceneProps) => {
  const { t, columns, handleOpenCreateJobDialog, jobsFeRows, DeleteJobDialog } =
    useJobsScene();

  return (
    <>
      <Widget
        sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Button
          sx={{ alignSelf: "flex-end", maxWidth: "240px" }}
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleOpenCreateJobDialog}
        >
          {t("job.add")}
        </Button>
        <Stack spacing={2} sx={{ width: "100%", display: "grid", flex: 1 }}>
          <DataGrid
            columns={columns}
            rows={jobsFeRows}
            sx={{ flex: 1 }}
            autoPageSize
          />
        </Stack>
      </Widget>
      <CreateJobDialog />
      <EditJobDialog />
      {DeleteJobDialog}
    </>
  );
});

JobsScene.displayName = "JobsScene";
