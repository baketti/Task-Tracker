import React, { memo } from "react";
import { useAuthenticationScene } from "./index.hooks";
import { AppNavbar } from "@/components/AppNavbar";
import { Outlet } from "react-router-dom";

type AuthenticationSceneProps = {};

export const AuthenticationScene = memo(({}: AuthenticationSceneProps) => {
  const {} = useAuthenticationScene();

  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
});

AuthenticationScene.displayName = "AuthenticationScene";
