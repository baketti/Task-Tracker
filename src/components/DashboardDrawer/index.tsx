import { memo } from "react";
import * as React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import MuiDrawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDashboardDrawer } from "./index.hooks";
import { DashboardDrawerHeader } from "@/components/DashboardDrawerHeader";
import CategoryIcon from "@mui/icons-material/Category";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { useInitializeTranslations } from "@/hooks/useInitializeTranslations";
import { AppNavbar } from "../AppNavbar";
import { Colors } from "@/themes";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = ({ open, ...props }: DrawerProps & { open: boolean }) => {
  const theme = useTheme();

  return (
    <MuiDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": openedMixin(theme),
        }),
        ...(!open && {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme),
        }),
      }}
      {...props}
    />
  );
};

type DashboardDrawerProps = {};
export const DashboardDrawer = memo(({}: DashboardDrawerProps) => {
  const {
    theme,
    open,
    handleDrawerOpen,
    handleDrawerClose,
    navigate,
    handleLogout,
  } = useDashboardDrawer();

  const [t] = useTypedTranslations();
  useInitializeTranslations();

  return (
    <>
      <AppNavbar open={open} onDrawerOpen={handleDrawerOpen} />
      <Drawer variant="permanent" open={open}>
        <DashboardDrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon htmlColor="white" />
            ) : (
              <ChevronLeftIcon htmlColor="white" />
            )}
          </IconButton>
        </DashboardDrawerHeader>
        <Divider />
        <List>
          {[
            t("drawer.customers"),
            t("drawer.projects"),
            t("drawer.jobs"),
            t("drawer.workers"),
          ].map((text, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() =>
                  index == 0
                    ? navigate("")
                    : index == 1
                    ? navigate("projects")
                    : index == 2
                    ? navigate("jobs")
                    : navigate("workers")
                }
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {text === t("drawer.jobs") ? (
                    <AssignmentIcon htmlColor="white" />
                  ) : text === t("drawer.customers") ? (
                    <ApartmentIcon htmlColor="white" />
                  ) : text === t("drawer.workers") ? (
                    <AccountBoxIcon htmlColor="white" />
                  ) : (
                    <CategoryIcon htmlColor="white" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[t("drawer.logout")].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={handleLogout}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <LogoutIcon htmlColor="white" />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
});

DashboardDrawer.displayName = "DashboardDrawer";
