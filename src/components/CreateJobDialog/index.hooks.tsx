import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "@/spas/app/redux-store";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";
import { useCallback, useMemo } from "react";

export const useCreateJobDialog = () => {
  const [t] = useTypedTranslations();
  const schema = yup.object({
    name: yup
      .string()
      .min(3, t("validation.nameLen"))
      .required(t("validation.required")),
    projectId: yup.string().required(t("validation.required")),
  });
  const formData = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      projectId: "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = formData;

  const isCreatingJob: boolean = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.postJobs.api),
  );

  const submitDisabled = (isSubmitted && !isValid) || isCreatingJob;

  const dispatch = useDispatch();

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
  }, [dispatch]);

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
