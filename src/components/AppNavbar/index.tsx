import React, { memo } from "react";
import { useAppNavbar } from "./index.hooks";
import { useTheme } from "@mui/material/styles";
import { Toolbar, IconButton, Typography, Box } from "@mui/material";
import { LanguageMenuSpa } from "../LanguageMenuSpa";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";

const AppBar = ({ open, ...props }: AppBarProps & { open: boolean }) => {
  const theme = useTheme();
  const drawerWidth = 240;

  return (
    <MuiAppBar
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }}
      {...props}
    />
  );
};

type AppNavbarProps = {
  open?: boolean;
  onDrawerOpen?: () => void;
};

export const AppNavbar = memo(({ open, onDrawerOpen }: AppNavbarProps) => {
  const { isLogged } = useAppNavbar();

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            {isLogged ? <MenuIcon /> : <></>}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="text.secondary"
          >
            Task Tracker
          </Typography>
        </Box>
        <LanguageMenuSpa />
      </Toolbar>
    </AppBar>
  );
});
AppNavbar.displayName = "AppNavbar";
