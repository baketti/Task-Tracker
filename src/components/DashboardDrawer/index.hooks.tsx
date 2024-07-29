import React, { useState, useCallback } from "react";
import { actions } from "@/spas/app/redux-store";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useDashboardDrawer = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  },[]);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  },[]);

  const handleLogout = useCallback(() => {
    dispatch(actions.deleteSessions.request({}));
  },[dispatch]);

  return {
    theme,
    open,
    handleDrawerOpen,
    handleDrawerClose,
    navigate,
    handleLogout,
  };
};
