import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { CustomerChip } from "@/components/CustomerChip";
import { actions, selectors } from "@/spas/app/redux-store";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";
import { JobFe } from "@/models/client/JobFe";
import { useProjectsScene } from "@/spas/app/scenes/ProjectsScene/index.hooks";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ObjectIdFe } from "@/models/common/JsUtility";
import useConfirmDialog from "@/hooks/useConfirmDialog";

export const useJobsScene = () => {
  const [t] = useTypedTranslations();
  const dispatch = useDispatch();
  const jobs = useSelector(selectors.getJobsList);

  const handleOpenEditJobDialog = useCallback(
    (editJobId) => {
      dispatch(actions.setEditJobId(editJobId));
      dispatch(
        actions.setDialogOpen({
          dialogType: DialogTypes.EDIT_JOB,
          open: true,
        }),
      );
    },
    [dispatch],
  );

  const deleteJobIdRef = useRef<ObjectIdFe>(null);

  const handleDeleteJob = useCallback(() => {
    dispatch(
      actions.deleteJobsByJobId.request({
        jobId: deleteJobIdRef.current,
      }),
    );
  }, [dispatch]);
  const { show: handleOpenDeleteJobDialog, dialog: DeleteJobDialog } =
    useConfirmDialog({
      onConfirm: handleDeleteJob,
      onCancel: () => null,
      content: t("jobs.deleteTitle"),
    });
  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        headerName: t("job.name"),
        flex: 1,
        minWidth: 150,
        maxWidth: 150,
      },
      {
        field: "project",
        headerName: t("project.name"),
        flex: 1,
        minWidth: 150,
        maxWidth: 150,
      },
      {
        field: "customer",
        headerName: t("customers.name"),
        renderCell: (params) =>
          params.value ? <CustomerChip customer={params.value} /> : null,
        flex: 0.5,
      },
      {
        field: "editJob",
        headerName: "",
        renderCell: (params) => {
          return (
            <IconButton
              color="warning"
              onClick={() => handleOpenEditJobDialog(params.row.id)}
            >
              <EditIcon />
            </IconButton>
          );
        },
      },
      {
        field: "deleteJob",
        headerName: "",
        renderCell: (params) => {
          return (
            <IconButton
              color="error"
              onClick={() => {
                deleteJobIdRef.current = params.row.id;
                handleOpenDeleteJobDialog();
              }}
            >
              <DeleteIcon />
            </IconButton>
          );
        },
      },
    ],
    [handleOpenDeleteJobDialog, handleOpenEditJobDialog, t],
  );

  const handleOpenCreateJobDialog = useCallback(() => {
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_JOB,
        open: true,
      }),
    );
  }, [dispatch]);

  const jobsFeRows = useMemo(
    () =>
      jobs.map((job) => ({
        id: job._id,
        name: job.name,
        isActive: job.isActive,
        project: job.project?.name,
        customer: job.customer,
      })) ?? [],
    [jobs],
  );

  useEffect(() => {
    dispatch(actions.getJobs.request({}));
  }, [dispatch]);

  return {
    t,
    handleOpenCreateJobDialog,
    columns,
    jobsFeRows,
    DeleteJobDialog,
  };
};
