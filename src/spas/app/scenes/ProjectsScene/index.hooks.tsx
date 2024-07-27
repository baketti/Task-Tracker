import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "@/spas/app/redux-store";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";
import { ProjectFe } from "@/models/client/ProjectFe";
import { CustomerChip } from "@/components/CustomerChip";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ObjectIdFe } from "@/models/common/JsUtility";
import useConfirmDialog from "@/hooks/useConfirmDialog";

export const useProjectsScene = () => {
  const [t] = useTypedTranslations();
  const dispatch = useDispatch();

  const projects = useSelector(selectors.getProjectsList);

  const handleOpenEditProjectDialog = useCallback(
    (editProjectId) => {
      dispatch(actions.setEditProjectId(editProjectId));
      dispatch(
        actions.setDialogOpen({
          dialogType: DialogTypes.EDIT_PROJECT,
          open: true,
        }),
      );
    },
    [dispatch],
  );

  const deleteProjectIdRef = useRef<ObjectIdFe>(null);

  const handleDeleteProject = useCallback(() => {
    dispatch(
      actions.deleteProjectsByProjectId.request({
        projectId: deleteProjectIdRef.current,
      }),
    );
  }, [dispatch]);
  const { show: handleOpenDeleteProjectDialog, dialog: DeleteProjectDialog } =
    useConfirmDialog({
      onConfirm: handleDeleteProject,
      onCancel: () => null,
      content: t("projects.deleteTitle"),
    });

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        headerName: t("project.name"),
        minWidth: 150,
        maxWidth: 150,
      },
      {
        field: "customer",
        headerName: t("project.customer"),
        renderCell: (params) =>
          params.value ? <CustomerChip customer={params.value} /> : null,
        minWidth: 150,
        maxWidth: 150,
      },
      {
        field: "intermediary",
        headerName: t("project.intermediary"),
        renderCell: (params) =>
          params.value ? <CustomerChip customer={params.value} /> : null,
        flex: 1,
      },
      {
        field: "editProject",
        headerName: "",
        renderCell: (params) => {
          return (
            <IconButton
              color="warning"
              onClick={() => handleOpenEditProjectDialog(params.row.id)}
            >
              <EditIcon />
            </IconButton>
          );
        },
      },
      {
        field: "deleteProject",
        headerName: "",
        renderCell: (params) => {
          return (
            <IconButton
              color="error"
              onClick={() => {
                deleteProjectIdRef.current = params.row.id;
                handleOpenDeleteProjectDialog();
              }}
            >
              <DeleteIcon />
            </IconButton>
          );
        },
      },
    ],
    [handleOpenDeleteProjectDialog, handleOpenEditProjectDialog, t],
  );

  const handleOpenCreateProjectDialog = useCallback(() => {
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_PROJECT,
        open: true,
      }),
    );
  }, [dispatch]);

  const projectsRows = useMemo(
    () =>
      projects.map((project) => ({
        id: project._id,
        name: project.name,
        customer: project.customer,
        website: project.website,
        intermediary: project.intermediary,
      })),
    [projects],
  );

  useEffect(() => {
    dispatch(actions.getProjects.request({}));
  }, [dispatch]);

  return {
    t,
    handleOpenCreateProjectDialog,
    columns,
    projectsRows,
    DeleteProjectDialog,
  };
};
