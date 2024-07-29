import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "@/spas/app/redux-store";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";
import { useCallback, useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { ObjectIdFe } from "@/models/common/JsUtility";

type JobsAssociationsFormData = {
  associations: ObjectIdFe[];
};

export const useAssociateJobsDialog = () => {
  const dispatch = useDispatch();

  const [t] = useTypedTranslations();

  const schema = useMemo(() => {
    return  yup.object({
      associations: yup.array().required(t("validation.required")).of(yup.string()),
    });  
  },[t])
  
  const jobs = useSelector(selectors.getJobsList);
  const worker = useSelector(selectors.getCurrentWorker);
  const enabledJobIds = useMemo(() => {
    return worker?.enabledJobIds || [];
  }, [worker]);

  const availableJobIds = useMemo(() => {
    return jobs.filter((job) => !enabledJobIds.includes(job._id));
  }, [jobs, enabledJobIds]);

  const isPostingJobAssociations = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.patchWorkersByWorkerId.api),
  );

  const isDialogOpen = useSelector(selectors.getIsDialogOpen)[
    DialogTypes.ASSOCIATE_JOBS
  ];

  const formData = useForm<JobsAssociationsFormData>({
    defaultValues: {
      associations: [],
    },
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isValid, isSubmitted },
  } = formData;

  const associations = useWatch<JobsAssociationsFormData>({
    control,
    name: "associations",
  });

  const submitDisabled =
    (isSubmitted && !isValid) ||
    isPostingJobAssociations ||
    !availableJobIds.length ||
    !associations.length;

  const triggerSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        console.log(data);
        dispatch(
          actions.patchWorkersByWorkerId.request({
            workerId: worker.id,
            enabledJobIds: [...worker.enabledJobIds, ...data.associations],
          }),
        );
      }),
    [dispatch, handleSubmit, worker],
  );

  const onDialogClose = useCallback(() => {
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.ASSOCIATE_JOBS,
        open: false,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(actions.getJobs.request({}));
  }, [dispatch]);

  useEffect(() => {
    reset({
      associations: [],
    });
  }, [reset]);

  return {
    t,
    isDialogOpen,
    onDialogClose,
    availableJobIds,
    formData,
    triggerSubmit,
    isPostingJobAssociations,
    submitDisabled,
  };
};
