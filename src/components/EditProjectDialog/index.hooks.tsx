import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { actions, selectors } from "@/spas/app/redux-store";
import { useDispatch, useSelector } from "react-redux";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";
import { ObjectIdFe } from "@/models/common/JsUtility";

type EditProjectDialogData = {
  name: string;
  website?: string;
  customerId: ObjectIdFe;
  intermediaryId?: ObjectIdFe;
};

export const useEditProjectDialog = () => {
  const [t] = useTypedTranslations();

  const schema = useMemo(() => {
    return yup.object({
      name: yup.string().min(3, t("validation.nameLen")).optional(),
      website: yup.string().url().optional(),
      customerId: yup.string().optional(),
      intermediaryId: yup.string().optional().nullable(),
    });
  },[t])

  const projects = useSelector(selectors.getProjectsList);
  const editProjectId = useSelector(selectors.getEditProjectId);
  const editProject = useMemo(
    () => projects.find((project) => project._id == editProjectId),
    [editProjectId, projects],
  );
  const isEditingProject = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.patchProjectsByProjectId.api),
  );
  const isEditProjectDialogOpen = useSelector(selectors.getIsDialogOpen)[
    DialogTypes.EDIT_PROJECT
  ];

  const formData = useForm<EditProjectDialogData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: editProject?.name || "",
      website: editProject?.website || "",
      customerId: editProject?.customer?._id || null,
      intermediaryId: editProject?.intermediary?._id || null,
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitted },
    reset,
  } = formData;

  const dispatch = useDispatch();
  const submitDisabled: boolean = (isSubmitted && !isValid) || isEditingProject;
  const triggerSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        console.log("actions.patchProjectsByProjectId.request=>",data)
        dispatch(
          actions.patchProjectsByProjectId.request({
            projectId: editProjectId,
            name: data.name,
            customerId: data.customerId || null,
            website: data.website,
            intermediaryId: data.intermediaryId || null,
          }),
        );
      }),
    [handleSubmit, editProjectId, dispatch],
  );

  useEffect(() => {
    reset({
      name: editProject?.name || "",
      website: editProject?.website || "",
      customerId: editProject?.customer?._id || null,
      intermediaryId: editProject?.intermediary?._id || null,
    });
  }, [reset, editProject]);

  const handleCloseDialog = useCallback(() => {
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.EDIT_PROJECT,
        open: false,
      }),
    );
    dispatch(actions.setEditProjectId(null));
  }, [dispatch]);

  return {
    t,
    formData,
    triggerSubmit,
    isEditingProject,
    isEditProjectDialogOpen,
    handleCloseDialog,
    submitDisabled,
  };
};
