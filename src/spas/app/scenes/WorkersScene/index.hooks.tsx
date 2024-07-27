import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "@/spas/app/redux-store";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";
import { GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ObjectIdFe } from "@/models/common/JsUtility";
import useConfirmDialog from "@/hooks/useConfirmDialog";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";

export const useWorkersScene = () => {
  const [t] = useTypedTranslations();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const workers = useSelector(selectors.getWorkersList);

  const handleOpenEditWorkerDialog = useCallback(
    (editWorkerId) => {
      dispatch(actions.setEditWorkerId(editWorkerId));
      dispatch(
        actions.setDialogOpen({
          dialogType: DialogTypes.EDIT_WORKER,
          open: true,
        }),
      );
    },
    [dispatch],
  );

  const deleteWorkerIdRef = useRef<ObjectIdFe>(null);

  const handleDeleteWorker = useCallback(() => {
    dispatch(
      actions.deleteWorkersByWorkerId.request({
        workerId: deleteWorkerIdRef.current,
      }),
    );
  }, [dispatch]);
  const { show: handleOpenDeleteWorkerDialog, dialog: DeleteWorkerDialog } =
    useConfirmDialog({
      onConfirm: handleDeleteWorker,

      onCancel: () => null,
      content: t("Workers.deleteTitle"),
    });

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "fullName",
        headerName: t("workers.fullName"),
        flex: 1,
        minWidth: 150,
        maxWidth: 150,
      },
      {
        field: "workerDetails",
        headerName: "",
        renderCell: (params) => {
          return (
            <IconButton color="primary" onClick={() => navigate(params.row.id)}>
              <RemoveRedEyeIcon />
            </IconButton>
          );
        },
        flex: 1,
      },
      {
        field: "editWorker",
        headerName: "",
        renderCell: (params) => {
          return (
            <IconButton
              color="warning"
              onClick={() => {
                deleteWorkerIdRef.current = params.row.id;
                handleOpenEditWorkerDialog(deleteWorkerIdRef.current);
              }}
            >
              <EditIcon />
            </IconButton>
          );
        },
      },
      {
        field: "deleteWorker",
        headerName: "",
        renderCell: (params) => {
          return (
            <IconButton
              color="error"
              onClick={() => {
                deleteWorkerIdRef.current = params.row.id;
                handleOpenDeleteWorkerDialog();
              }}
            >
              <DeleteIcon />
            </IconButton>
          );
        },
      },
    ],
    [handleOpenDeleteWorkerDialog, handleOpenEditWorkerDialog, navigate, t],
  );

  const workersRows = useMemo(
    () =>
      workers.map((worker) => ({
        id: worker.id,
        fullName: worker.fullName,
      })),
    [workers],
  );

  useEffect(() => {
    dispatch(actions.getWorkers.request({}));
  }, [dispatch]);

  const handleOpenCreateWorkerDialog = useCallback(() => {
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_WORKER,
        open: true,
      }),
    );
  }, [dispatch]);

  return {
    columns,
    t,
    handleOpenCreateWorkerDialog,
    handleDeleteWorker,
    workersRows,
    DeleteWorkerDialog,
  };
};
