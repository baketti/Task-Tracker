import { useNavigate } from "react-router-dom";
import domNavigation from "@/models/client/DomNavigation";

export const useDashboardScene = () => {
  const navigate = useNavigate();
  domNavigation.navigate = navigate;
  return {
    navigate,
  };
};
