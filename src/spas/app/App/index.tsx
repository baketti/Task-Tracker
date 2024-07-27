import React, { memo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AppSnackbar } from "@/components/AppSnackbar";
import useAppHooks from "./index.hooks";
import { TranslatedRoute } from "@/components/TranslatedRoute";
import {
  AuthenticationScene,
  RegistrationScene,
  CustomersScene,
  DashboardScene,
  ProjectsScene,
  JobsScene,
  WorkersScene,
  WorkerDetailsScene,
  LoginScene,
} from "@/spas/app/scenes";
import { RoutesProtector } from "@/components/RoutesProtector";

const App: React.FC = () => {
  const { theme, open, type, message, handleClose } = useAppHooks();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="/">
        <Routes>
          <Route path="" element={<RoutesProtector />}>
            <Route
              path="/:languageCode/app"
              element={
                <TranslatedRoute>
                  <DashboardScene />
                </TranslatedRoute>
              }
            >
              <Route
                path=""
                element={
                  <TranslatedRoute>
                    <CustomersScene />
                  </TranslatedRoute>
                }
              ></Route>
              <Route
                path="projects"
                element={
                  <TranslatedRoute>
                    <ProjectsScene />
                  </TranslatedRoute>
                }
              ></Route>
              <Route
                path="jobs"
                element={
                  <TranslatedRoute>
                    <JobsScene />
                  </TranslatedRoute>
                }
              ></Route>
              <Route
                path="workers"
                element={
                  <TranslatedRoute>
                    <WorkersScene />
                  </TranslatedRoute>
                }
              ></Route>
              <Route
                path="workers/:workerId"
                element={
                  <TranslatedRoute>
                    <WorkerDetailsScene />
                  </TranslatedRoute>
                }
              ></Route>
            </Route>
          </Route>
          <Route
            path="/:languageCode/app/authentication"
            element={<AuthenticationScene />}
          >
            <Route
              path="login"
              element={
                <TranslatedRoute>
                  <LoginScene />
                </TranslatedRoute>
              }
            />
            <Route
              path="registration"
              element={
                <TranslatedRoute>
                  <RegistrationScene />
                </TranslatedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <AppSnackbar
        open={open}
        message={message}
        severity={type}
        onClose={handleClose}
      />
    </ThemeProvider>
  );
};

export default memo(App);
