import { useCallback, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "@/spas/app/redux-store";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";

type CreateWorkerDialogData = {
  fullName: string;
};
export const useCreateWorkerDialog = () => {
  const [t] = useTypedTranslations();
  const dispatch = useDispatch();

  const schema = useMemo(() => {
    return yup.object({
      fullName: yup
        .string()
        .min(3, t("validation.nameLen"))
        .required(t("validation.required")),
    });
  },[t])

  const formData = useForm<CreateWorkerDialogData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
    },
  });
  const {
    reset,
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = formData;

  const isCreatingWorker: boolean = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.postWorkers.api),
  );

  const submitDisabled: boolean = (isSubmitted && !isValid) || isCreatingWorker;

  const isCreateWorkerDialogOpen = useSelector(selectors.getIsDialogOpen)[
    DialogTypes.CREATE_WORKER
  ];

  const triggerSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        dispatch(actions.postWorkers.request(data));
      }),
    [dispatch, handleSubmit],
  );

  const handleCloseDialog = useCallback(() => {
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_WORKER,
        open: false,
      }),
    );
    reset({
      fullName: "",
    })
  }, [dispatch,reset]);

  useEffect(() => {
    reset({
      fullName: "",
    })
  },[reset])

  return {
    formData,
    triggerSubmit,
    submitDisabled,
    t,
    isCreatingWorker,
    isCreateWorkerDialogOpen,
    handleCloseDialog,
  };
};
