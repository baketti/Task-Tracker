import { useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { UserRoles } from "@/models/common/UserCommon";
import { Translations } from "@/translations/translations.type";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "@/spas/app/redux-store";
import { useNavigate, useParams } from "react-router-dom";
import { Locales } from "@/models/common/Translation";

type RegisterFormData = {
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
};

export const useRegisterForm = () => {
  const [t] = useTypedTranslations();
  const { languageCode } = useParams<{ languageCode: Locales }>();
  const dispatch = useDispatch();

  const schema = useMemo(() => {
    return yup.object({
      email: yup.string().email().required("Email "+t("is.required")),
      role: yup
        .string()
        .oneOf(Object.values(UserRoles))
        .required(t("role")+t("is.required")),
      password: yup
        .string()
        .min(8, t("password.len"))
        .required("Password "+t("is.required")),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], t("password.match")),
    });
  },[t])

  const userRoleOptions = useMemo(
    () =>
      Object.values(UserRoles).map((role) => ({
        value: role.toString(),
        label: t(role as keyof Translations),
      })),
    [t],
  );

  const formData = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
  });
  const {
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = formData;
  const submitDisabled = isSubmitted && !isValid;

  const isPostUserAjaxLoading = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.postUsers.api),
  );

  const triggerSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        console.log(data);
        dispatch(
          actions.postUsers.request({
            email: data.email,
            role: data.role,
            password: data.password,
          }),
        );
      }),
    [handleSubmit, dispatch],
  );

  return {
    t,
    userRoleOptions,
    formData,
    isPostUserAjaxLoading,
    triggerSubmit,
    submitDisabled,
    languageCode,
  };
};
