import React, { memo } from "react";
import { useLoginScene } from "./index.hooks";
import { Avatar, Paper, Stack, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { TaskTrackerLogo } from "@/components/TaskTrackerLogo";
import { LoginForm } from "@/components/LoginForm";

type LoginSceneProps = {};

export const LoginScene = memo(({}: LoginSceneProps) => {
  const { t } = useLoginScene();

  return (
    <Stack
      spacing={1}
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh" }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" color="primary">
        {t("sign.in")}
      </Typography>
      <Paper sx={{ p: 4, minWidth: "480px" }}>
        <LoginForm />
      </Paper>
    </Stack>
  );
});

LoginScene.displayName = "LoginScene";
