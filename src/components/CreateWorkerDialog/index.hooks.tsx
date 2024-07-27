import { useCallback, useMemo } from "react";
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
  const schema = yup.object({
    fullName: yup
      .string()
      .min(5, t("validation.nameLen"))
      .required(t("validation.required")),
  });
  const formData = useForm<CreateWorkerDialogData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
    },
  });
  const {
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = formData;

  const isCreatingWorker: boolean = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.postWorkers.api),
  );

  const submitDisabled: boolean = (isSubmitted && !isValid) || isCreatingWorker;

  const dispatch = useDispatch();
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
  }, [dispatch]);

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
