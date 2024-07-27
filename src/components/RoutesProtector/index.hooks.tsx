import { selectors } from "@/spas/app/redux-store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Locales } from "@/models/common/Translation";

export const useRoutesProtector = () => {
  const isLogged = useSelector(selectors.getIsLogged);
  const { languageCode } = useParams<{ languageCode: Locales }>();

  return {
    isLogged,
    languageCode,
  };
};
