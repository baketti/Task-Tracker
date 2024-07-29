import { useNavigate, useParams } from "react-router-dom";
import domNavigation from "@/models/client/DomNavigation";
import { Locales } from "@/models/common/Translation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectors } from "../../redux-store";

export const useDashboardScene = () => {
  const navigate = useNavigate();
  domNavigation.navigate = navigate;
  const isLogged = useSelector(selectors.getIsLogged);
  const { languageCode } = useParams<{ languageCode: Locales }>();

  useEffect(() => {
    if(!isLogged){
      navigate(`/${languageCode}/app/authentication/login`)
    }
  }, [isLogged, languageCode, navigate]);
  
  return {
    navigate,
  };
};
