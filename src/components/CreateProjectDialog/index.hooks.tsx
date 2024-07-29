import { useCallback, useMemo, useEffect } from "react";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "@/spas/app/redux-store";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";

export const useCreateProjectDialog = () => {
  const [t] = useTypedTranslations();
  const dispatch = useDispatch();

  const schema = useMemo(() => {
    return yup.object({
      name: yup
        .string()
        .min(3, t("validation.nameLen"))
        .required(t("validation.required")),
      website: yup.string().url().optional(),
      customerId: yup.string().required(t("validation.required")),
      intermediaryId: yup.string().optional().nullable(),
    });
  },[t])

  const formData = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      website: "",
      customerId: "",
      intermediaryId: null,
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = formData;

  const isCreatingProject: boolean = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.postProjects.api),
  );

  const submitDisabled = (isSubmitted && !isValid) || isCreatingProject;

  const isCreateProjectDialogOpen = useSelector(selectors.getIsDialogOpen)[
    DialogTypes.CREATE_PROJECT
  ];

  const triggerSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        dispatch(actions.postProjects.request(data));
      }),
    [dispatch, handleSubmit],
  );

  const handleCloseDialog = useCallback(() => {
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_PROJECT,
        open: false,
      }),
    );
    reset({
      name: "",
      website: "",
      customerId: "",
      intermediaryId: null,
    })
  }, [dispatch,reset]);

  useEffect(() => {
    reset({
      name: "",
      website: "",
      customerId: "",
      intermediaryId: null,
    })
  },[reset])

  return {
    formData,
    triggerSubmit,
    submitDisabled,
    t,
    isCreatingProject,
    isCreateProjectDialogOpen,
    handleCloseDialog,
  };
};
