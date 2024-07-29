import { useCallback, useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { actions, selectors } from "@/spas/app/redux-store";
import { useDispatch, useSelector } from "react-redux";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";
import { ObjectIdFe } from "@/models/common/JsUtility";

type EditWorkerDialogData = {
  fullName?: string;
  enabledJobIds?: ObjectIdFe[];
  enableInternship?: boolean;
  readOnly?: boolean;
  hours?: number;
  startDate?: string;
};

export const useEditWorkerDialog = () => {
  const [t] = useTypedTranslations();
  const dispatch = useDispatch();

  const jobs = useSelector(selectors.getJobsList);

  const workers = useSelector(selectors.getWorkersList);
  const editWorkerId = useSelector(selectors.getEditWorkerId);
  const editWorker = useMemo(
    () => workers.find((worker) => worker.id === editWorkerId),
    [workers, editWorkerId],
  );

  const schema = useMemo(() => {
    return yup.object({
      fullName: yup.string().min(3, t("validation.nameLen")).optional(),
      enabledJobIds: yup.array().nullable().of(yup.string()),
      enableInternship: yup.boolean().optional(),
      hours: yup
        .number()
        .nullable()
        .when(["enableInternship"], {
          is: (enableInternship) =>
            enableInternship === true,
          then: yup.number().required(),
          otherwise: yup.number().nullable(),
        }),
      startDate: yup
        .string()
        .nullable()
        .when(["enableInternship"], {
          is: (enableInternship) =>
            enableInternship === true,
          then: yup.string().required(),
          otherwise: yup.string().nullable(),
        }),
    });
  },[t])

  const formData = useForm<EditWorkerDialogData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: editWorker?.fullName || "",
      enabledJobIds: editWorker?.enabledJobIds || [],
      enableInternship: editWorker?.isIntern || false,
      hours: editWorker?.hours || 0,
      startDate: editWorker?.startDate || null,
    },
  });

  const isEditingWorker: boolean = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.patchWorkersByWorkerId.api),
  );

  const isEditWorkerDialogOpen = useSelector(selectors.getIsDialogOpen)[
    DialogTypes.EDIT_WORKER
  ];

  const {
    handleSubmit,
    formState: { isValid, isSubmitted },
    reset,
    setValue,
    control,
  } = formData;
  const submitDisabled = (isSubmitted && !isValid) || isEditingWorker;

  const triggerSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        console.log(data);
        dispatch(
          actions.patchWorkersByWorkerId.request({
            workerId: editWorkerId,
            fullName: data.fullName,
            enabledJobIds: data.enabledJobIds,
            isIntern: data.enableInternship,
            hours: data.hours,
            startDate: data.startDate,
          }),
        );
      }),
    [handleSubmit, editWorkerId, dispatch],
  );

  useEffect(() => {
    reset({
      fullName: editWorker?.fullName || "",
      enabledJobIds: editWorker?.enabledJobIds || [],
      enableInternship: editWorker?.isIntern || false,
      hours: editWorker?.hours || 0,
      startDate: editWorker?.startDate || null,
    });
  }, [reset, editWorker]);

  const handleCloseDialog = useCallback(() => {
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.EDIT_WORKER,
        open: false,
      }),
    );
    dispatch(actions.setEditWorkerId(null));
  }, [dispatch]);

  const enabledJobIds = useWatch({
    control,
    name: "enabledJobIds",
  });

  const isInternshipEnabled = useWatch({
    control,
    name: "enableInternship",
  });

  useEffect(() => {
    if(enabledJobIds.length){
      setValue("enableInternship",true)
    }else if(!isInternshipEnabled){
      reset({
        enabledJobIds:[]
      })
    }
  },[enabledJobIds,isInternshipEnabled,setValue,reset]);

  return {
    formData,
    triggerSubmit,
    handleSubmit,
    submitDisabled,
    t,
    isEditingWorker,
    isEditWorkerDialogOpen,
    handleCloseDialog,
    jobs,
    isInternshipEnabled,
  };
};
