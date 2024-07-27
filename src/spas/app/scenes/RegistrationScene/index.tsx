import React, { memo } from "react";
import { useRegistrationScene } from "./index.hooks";
import { Avatar, Paper, Stack, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { RegisterForm } from "@/components/RegisterForm";

type RegistrationSceneProps = {};

export const RegistrationScene = memo(({}: RegistrationSceneProps) => {
  const { t } = useRegistrationScene();

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
        {t("sign.up")}
      </Typography>
      <Paper sx={{ p: 4, minWidth: "480px" }}>
        <RegisterForm />
      </Paper>
    </Stack>
  );
});

RegistrationScene.displayName = "RegistrationScene";
