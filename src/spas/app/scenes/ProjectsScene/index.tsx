import React, { memo } from "react";
import { useProjectsScene } from "./index.hooks";
import { Box, Button, Paper, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import { CreateProjectDialog } from "@/components/CreateProjectDialog";
import { EditProjectDialog } from "@/components/EditProjectDialog";
import { Widget } from "@/components/Widget";

type ProjectsSceneProps = {};

export const ProjectsScene = memo(({}: ProjectsSceneProps) => {
  const {
    t,
    columns,
    projectsRows,
    handleOpenCreateProjectDialog,
    DeleteProjectDialog,
  } = useProjectsScene();

  return (
    <>
      <Widget
        sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Button
          sx={{ alignSelf: "flex-end", maxWidth: "240px" }}
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleOpenCreateProjectDialog}
        >
          {t("project.add")}
        </Button>
        <Stack spacing={2} sx={{ width: "100%", display: "grid", flex: 1 }}>
          <DataGrid
            columns={columns}
            rows={projectsRows}
            sx={{ flex: 1 }}
            autoPageSize
          />
        </Stack>
      </Widget>
      <CreateProjectDialog />
      <EditProjectDialog />
      {DeleteProjectDialog}
    </>
  );
});

ProjectsScene.displayName = "ProjectsScene";
