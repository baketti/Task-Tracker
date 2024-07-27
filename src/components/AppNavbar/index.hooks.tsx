import { selectors } from "@/spas/app/redux-store";
import { useSelector } from "react-redux";

export const useAppNavbar = () => {
  const isLogged = useSelector(selectors.getIsLogged);

  return {
    isLogged,
  };
};
