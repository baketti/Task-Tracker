import { actions, selectors } from "@/spas/app/redux-store";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { DialogTypes } from "../../redux-store/slices/ui/ui.interfaces";
import { ObjectIdFe } from "@/models/common/JsUtility";
import useConfirmDialog from "@/hooks/useConfirmDialog";
import { UserRoles } from "@/models/common/UserCommon";
import { Locales } from "@/models/common/Translation";
import { CustomerChip } from "@/components/CustomerChip";

export const useWorkerDetailsScene = () => {
  const [t] = useTypedTranslations();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { languageCode } = useParams<{ languageCode: Locales }>();
  //LOGGED USER
  const user = useSelector(selectors.getUser);
  useEffect(() => {
    if(user.role !== UserRoles.Admin){
      navigate(`/${languageCode}/app/workers`);
    }
  }, [navigate,user,languageCode]);

  const { workerId } = useParams();
  
  useEffect(() => { 
    dispatch(
      actions.getWorkersByWorkerId.request({
        workerId,
      }),
    );
  }, [dispatch, workerId]);
  
  const worker = useSelector(selectors.getCurrentWorker);
  
  const isLoadingWorker = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.getWorkersByWorkerId.api),
  );
  
  const associatedJobIdRef = useRef<ObjectIdFe>(null);

  const handleRemoveJobAssociation = useCallback(() => {
    const removedJobId = associatedJobIdRef.current;
    const updatedJobIds = worker?.enabledJobIds.filter(
      (jobId) => jobId !== removedJobId,
    );
    dispatch(
      actions.patchWorkersByWorkerId.request({
        workerId,
        enabledJobIds: updatedJobIds,
      }),
    );
  }, [dispatch, worker?.enabledJobIds, workerId]);

  const {
    show: handleOpenRemoveJobAssociationDialog,
    dialog: RemoveJobAssociationDialog,
  } = useConfirmDialog({
    onConfirm: handleRemoveJobAssociation,
    onCancel: () => null,
    content: t("workers.removeJobConfirm"),
  });

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "enabledJob",
        headerName: t("job.name"),
        minWidth: 150,
      },
      {
        field: "projectName",
        headerName: t("project.name"),
        minWidth: 150,
        maxWidth: 150,
      },
      {
        field: "projectCustomer",
        headerName: t("project.customer"),
        renderCell: (params) =>
          params.value ? <CustomerChip customer={params.value} /> : null,
        minWidth: 150,
        flex: 1,
      },
      {
        field: "deleteJobAssociation",
        headerName: "",
        renderCell: (params) => {
          return (
            <IconButton
              color="error"
              onClick={() => {
                associatedJobIdRef.current = params.row.id;
                console.log(associatedJobIdRef.current);
                handleOpenRemoveJobAssociationDialog();
              }}
            >
              <DeleteIcon />
            </IconButton>
          );
        },
      },
    ],
    [handleOpenRemoveJobAssociationDialog, t]
  );

  const jobs = useSelector(selectors.getJobsList);

  const workerRows = useMemo(() => {
    return worker ? worker.enabledJobIds.map((jobId) => {
      const job = jobs.find((job) => job?._id === jobId);
      return {
        id: job._id,
        enabledJob: job.name, 
        projectName: job.project.name,
        projectCustomer: job.project.customer,
      };
    }) : []
   },[worker, jobs]);

  const onAssociateJobsButtonClick = useCallback(() => {
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.ASSOCIATE_JOBS,
        open: true,
      }),
    );
  }, [dispatch]);

  const isAssociateJobDialogOpen = useSelector(selectors.getIsDialogOpen)[
    DialogTypes.ASSOCIATE_JOBS
  ];

  return {
    worker,
    isLoadingWorker,
    workerRows,
    columns,
    t,
    onAssociateJobsButtonClick,
    isAssociateJobDialogOpen,
    RemoveJobAssociationDialog,
  };
};
