import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "@/spas/app/redux-store";
import { useNavigate, useParams } from "react-router-dom";
import { Locales } from "@/models/common/Translation";

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

type LoginFormData = {
  email: string;
  password: string;
};

export const useLoginForm = () => {
  const [t] = useTypedTranslations();
  const navigate = useNavigate();
  const { languageCode } = useParams<{ languageCode: Locales }>();

  const formData = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = formData;
  const submitDisabled = isSubmitted && !isValid;

  const dispatch = useDispatch();

  const triggerSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        dispatch(
          actions.postSessions.request({
            email: data.email,
            password: data.password,
          }),
        );
      }),
    [handleSubmit, dispatch],
  );

  const isLoginAjaxLoading = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.postSessions.api),
  );

  const goToRegisterScene = useCallback(() => {
    navigate(`/${languageCode}/app/registration`);
  }, [navigate, languageCode]);

  return {
    goToRegisterScene,
    languageCode,
    formData,
    triggerSubmit,
    submitDisabled,
    t,
    isLoginAjaxLoading,
  };
};
