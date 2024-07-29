import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { actions, selectors } from "@/spas/app/redux-store";
import { useDispatch, useSelector } from "react-redux";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";
import { ObjectIdFe } from "@/models/common/JsUtility";

type EditJobDialogData = {
  name?: string;
  //isActive?:boolean,
  projectId?: ObjectIdFe;
};

export const useEditJobDialog = () => {

  const [t] = useTypedTranslations();

  const schema = useMemo(() => {
    return yup.object({
      name: yup.string().min(3, t("validation.nameLen")).optional(),
      // isActive: yup.boolean().optional(),
      projectId: yup.string().optional(),
    });
  },[t])

  const jobs = useSelector(selectors.getJobsList);

  const editJobId = useSelector(selectors.getEditJobId);

  const editJob = useMemo(
    () => jobs.find((job) => job._id == editJobId),
    [editJobId, jobs],
  );

  const isEditingJob = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.patchJobsByJobId.api),
  );

  const isEditJobDialogOpen = useSelector(selectors.getIsDialogOpen)[
    DialogTypes.EDIT_JOB
  ];

  const formData = useForm<EditJobDialogData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: editJob?.name || "",
      // isActive:editJob?.isActive || true,
      projectId: editJob?.project?._id || null,
    },
  });
  const {
    handleSubmit,
    formState: { isValid, isSubmitted },
    reset,
  } = formData;
  const submitDisabled: boolean = (isSubmitted && !isValid) || isEditingJob;

  const dispatch = useDispatch();

  const triggerSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        dispatch(
          actions.patchJobsByJobId.request({
            jobId: editJobId,
            name: data.name,
            //isActive: data.isActive,
            projectId: data.projectId || null,
          }),
        );
      }),
    [handleSubmit, editJobId, dispatch],
  );

  useEffect(() => {
    reset({
      name: editJob?.name || "",
      // isActive: editJob?.isActive,
      projectId: editJob?.project?._id || null,
    });
  }, [reset, editJob]);

  const handleCloseDialog = useCallback(() => {
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.EDIT_JOB,
        open: false,
      }),
    );
    dispatch(actions.setEditJobId(null));
  }, [dispatch]);

  return {
    formData,
    t,
    handleCloseDialog,
    triggerSubmit,
    isEditingJob,
    isEditJobDialogOpen,
    submitDisabled,
  };
};
