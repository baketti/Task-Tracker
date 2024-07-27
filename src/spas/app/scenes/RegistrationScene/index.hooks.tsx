import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { useNavigate } from "react-router-dom";
import domNavigation from "@/models/client/DomNavigation";

export const useRegistrationScene = () => {
  const [t] = useTypedTranslations();
  const navigate = useNavigate();
  domNavigation.navigate = navigate;
  return { t };
};
