import { Locales } from "@/models/common/Translation";
import { useCallback } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

export const useLanguageMenuSpa = () => {
  const { languageCode } = useParams<{ languageCode: Locales }>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeLanguage = useCallback(
    (newLanguage: string) => {
      const pathSegments = location.pathname.split("/");
      if (Object.values(Locales).includes(pathSegments[1] as Locales)) {
        pathSegments[1] = newLanguage;
      }
      const newPath = pathSegments.join("/");
      navigate(newPath);
    },
    [navigate, location],
  );

  return {
    languageCode,
    handleChangeLanguage,
  };
};
