import React, { memo } from "react";
import { useDashboardScene } from "./index.hooks";
import { Box, Stack } from "@mui/material";
import { DashboardDrawer } from "@/components/DashboardDrawer";
import { DashboardDrawerHeader } from "@/components/DashboardDrawerHeader";
import { Outlet } from "react-router";

type DashboardSceneProps = {};

export const DashboardScene = memo(({}: DashboardSceneProps) => {
  const {} = useDashboardScene();
  return (
    <Stack
      direction="row"
      sx={{
        minHeight: "100vh",
      }}
    >
      <DashboardDrawer />
      <Stack sx={{ flexGrow: 1, p: 3 }}>
        <DashboardDrawerHeader />
        <Outlet />
      </Stack>
    </Stack>
  );
});

DashboardScene.displayName = "DashboardScene";
