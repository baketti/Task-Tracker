import { selectors } from "@/spas/app/redux-store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Locales } from "@/models/common/Translation";
import { useEffect } from "react";

export const useRoutesProtector = () => {
  const isLogged = useSelector(selectors.getIsLogged);
  const { languageCode } = useParams<{ languageCode: Locales }>();
  useEffect(() => {
    console.log('isLogged:', isLogged);
    console.log('languageCode:', languageCode);
  }, [isLogged, languageCode]);
  return {
    isLogged,
    languageCode,
  };
};
