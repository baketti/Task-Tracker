import { Locales } from "@/models/common/Translation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectors } from "../../redux-store";

export const useAuthenticationScene = () => {
  const navigate = useNavigate();
  const isLogged = useSelector(selectors.getIsLogged);
  const { languageCode } = useParams<{ languageCode: Locales }>();

  useEffect(() => {
    if(isLogged){
      navigate(`/${languageCode}/app`)
    }
  }, [isLogged, languageCode, navigate]);

  return {};
};
