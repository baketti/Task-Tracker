import { useCallback, useMemo, useEffect } from "react";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "@/spas/app/redux-store";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";

export const useCreateJobDialog = () => {
  const [t] = useTypedTranslations();
  const dispatch = useDispatch();

  const schema = useMemo(() => {
    return yup.object({
      name: yup
        .string()
        .min(3, t("validation.nameLen"))
        .required(t("validation.required")),
      projectId: yup.string().required(t("validation.required")),
    });
  },[t])

  const formData = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      projectId: "",
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = formData;

  const isCreatingJob: boolean = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.postJobs.api),
  );

  const submitDisabled = (isSubmitted && !isValid) || isCreatingJob;

  const isCreateJobDialogOpen = useSelector(selectors.getIsDialogOpen)[
    DialogTypes.CREATE_JOB
  ];

  const triggerSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        dispatch(actions.postJobs.request(data));
      }),
    [dispatch, handleSubmit],
  );
  
  const handleCloseDialog = useCallback(() => {
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_JOB,
        open: false,
      }),
    );
    reset({
      name: "",
      projectId: "",
    })
  }, [dispatch,reset]);

  useEffect(() => {
    reset({
      name: "",
      projectId: "",
    })
  },[reset])

  return {
    formData,
    triggerSubmit,
    submitDisabled,
    t,
    isCreatingJob,
    isCreateJobDialogOpen,
    handleCloseDialog,
  };
};
