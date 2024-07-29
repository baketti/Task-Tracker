import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "@/spas/app/redux-store";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";

type CreateCustomerDialogData = {
  name: string;
  logoUrl?: string;
};

export const useCreateCustomerDialog = () => {
  const [t] = useTypedTranslations();

  const schema = useMemo(() => {
    return yup.object({
      name: yup
        .string()
        .min(3, t("validation.nameLen"))
        .required(t("validation.required")),
      logoUrl: yup.string().optional(),
    });
  },[t])

  const formData = useForm<CreateCustomerDialogData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      logoUrl: "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = formData;

  const isCreatingCustomer: boolean = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.postCustomers.api),
  );

  const submitDisabled: boolean =
    (isSubmitted && !isValid) || isCreatingCustomer;

  const dispatch = useDispatch();
  const isCreateCustomerDialogOpen = useSelector(selectors.getIsDialogOpen)[
    DialogTypes.CREATE_CUSTOMER
  ];
  const triggerSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        console.log("customer create: ", data);
        dispatch(actions.postCustomers.request(data));
      }),
    [dispatch, handleSubmit],
  );

  const handleCloseDialog = useCallback(() => {
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_CUSTOMER,
        open: false,
      }),
    );
  }, [dispatch]);

  return {
    formData,
    triggerSubmit,
    submitDisabled,
    t,
    isCreatingCustomer,
    isCreateCustomerDialogOpen,
    handleCloseDialog,
  };
};
