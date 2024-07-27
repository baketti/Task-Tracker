import { actions } from "@/spas/app/redux-store";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useDashboardDrawer = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(actions.deleteSessions.request({}));
  };

  return {
    theme,
    open,
    handleDrawerOpen,
    handleDrawerClose,
    navigate,
    handleLogout,
  };
};
