import theme from "@/themes";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "@/spas/app/redux-store";
import { AlertColor } from "@mui/material";

const useAppHooks = () => {
  const dispatch = useDispatch();

  const open: boolean = useSelector(selectors.getFeedbackOpen);
  const type: AlertColor = useSelector(selectors.getFeedbackType);
  const message: string = useSelector(selectors.getFeedbackMessage);

  useEffect(() => {
    dispatch(actions.appStartup());
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch(actions.closeFeedback());
  }, [dispatch]);

  return {
    theme,
    open,
    type,
    message,
    handleClose,
  };
};

export default useAppHooks;
