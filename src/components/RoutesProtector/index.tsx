import React, { memo } from "react";
import { useRoutesProtector } from "./index.hooks";
import { Outlet, Navigate } from "react-router-dom";

type RoutesProtectorProps = {};

export const RoutesProtector = memo(({}: RoutesProtectorProps) => {
  const { isLogged, languageCode } = useRoutesProtector();

  return (
    <>
      {isLogged ? (
        <Outlet />
      ) : (
        <Navigate replace to={`/${languageCode}/app/authentication/login`} />
      )}
    </>
  );
});
RoutesProtector.displayName = "RoutesProtector";
