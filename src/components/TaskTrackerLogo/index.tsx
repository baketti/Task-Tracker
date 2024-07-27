import React, { memo } from "react";
import { useTaskTrackerLogo } from "./index.hooks";
import { Paper } from "@mui/material";
import Image from "next/image";
import LogoImage from "@/assets/images/logo/logo.png";

type TaskTrackerLogoProps = {};

export const TaskTrackerLogo = memo(({}: TaskTrackerLogoProps) => {
  const {} = useTaskTrackerLogo();

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        width: 204,
        height: 204,
      }}
    >
      <Image
        src={LogoImage.src}
        alt="Task Tracker Logo"
        width={200}
        height={200}
        style={{ borderRadius: 8 }}
      />
    </Paper>
  );
});

TaskTrackerLogo.displayName = "TaskTrackerLogo";
