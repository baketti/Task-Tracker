import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { actions, selectors } from "@/spas/app/redux-store";
import { useDispatch, useSelector } from "react-redux";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";
import { CustomerFe } from "@/models/client/CustomerFe";
import { ObjectIdFe } from "@/models/common/JsUtility";

type EditCustomerDialogData = {
  name: string;
  logoUrl?: string;
};

export const useEditCustomerDialog = () => {
  const [t] = useTypedTranslations();
  const schema = yup.object({
    name: yup
      .string()
      .min(3, t("validation.nameLen"))
      .required(t("validation.required")),
    logoUrl: yup.string().optional(),
  });

  const customers: CustomerFe[] = useSelector(selectors.getCustomersList);
  const editCustomerId: ObjectIdFe = useSelector(selectors.getEditCustomerId);
  const editCustomer = useMemo(
    () => customers.find((c) => c._id === editCustomerId),
    [customers, editCustomerId],
  );

  const isEditingCustomer: boolean = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.patchCustomersByCustomerId.api),
  );

  const isEditCustomerDialogOpen = useSelector(selectors.getIsDialogOpen)[
    DialogTypes.EDIT_CUSTOMER
  ];

  const formData = useForm<EditCustomerDialogData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: editCustomer?.name || "",
      logoUrl: editCustomer?.logoUrl || "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitted },
    reset,
  } = formData;
  const submitDisabled: boolean =
    (isSubmitted && !isValid) || isEditingCustomer;
  const dispatch = useDispatch();

  const triggerSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        dispatch(
          actions.patchCustomersByCustomerId.request({
            customerId: editCustomerId,
            name: data.name,
            logoUrl: data.logoUrl,
          }),
        );
      }),
    [handleSubmit, editCustomerId, dispatch],
  );

  useEffect(() => {
    reset({
      name: editCustomer?.name || "",
      logoUrl: editCustomer?.logoUrl || "",
    });
  }, [reset, editCustomer]);

  const handleCloseDialog = useCallback(() => {
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.EDIT_CUSTOMER,
        open: false,
      }),
    );
    dispatch(actions.setEditCustomerId(null));
  }, [dispatch]);

  return {
    formData,
    triggerSubmit,
    submitDisabled,
    t,
    isEditingCustomer,
    isEditCustomerDialogOpen,
    handleCloseDialog,
  };
};
