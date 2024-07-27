import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "@/spas/app/redux-store";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";
import { useCallback, useMemo } from "react";

export const useCreateProjectDialog = () => {
  const [t] = useTypedTranslations();
  const customers = useSelector(selectors.getCustomersList);
  const schema = yup.object({
    name: yup
      .string()
      .min(3, t("validation.nameLen"))
      .required(t("validation.required")),
    website: yup.string().url().optional(),
    customerId: yup.string().required(t("validation.required")),
    intermediaryId: yup.string().optional().nullable(),
  });

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
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = formData;

  const isCreatingProject: boolean = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.postProjects.api),
  );

  const submitDisabled = (isSubmitted && !isValid) || isCreatingProject;

  const dispatch = useDispatch();

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
  }, [dispatch]);

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
