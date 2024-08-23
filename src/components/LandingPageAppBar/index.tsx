import React, { memo } from "react";
import { useLandingPageAppBar } from "./index.hooks";
import {
  AppBar,
  AppBarProps,
  Button,
  Container,
  Stack,
  Toolbar,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Colors } from "@/themes";
import { LanguageMenuNext } from "@/components/LanguageMenuNext";

type LandingPageAppBarProps = { locale } & AppBarProps;

export const LandingPageAppBar = memo(
  ({ locale, ...props }: LandingPageAppBarProps) => {
    const { t } = useLandingPageAppBar();

    return (
      <AppBar sx={{ height: 80 }} {...props}>
        <Container maxWidth="xl" sx={{ height: "100%" }}>
          <Toolbar
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Button
                color="primary"
                sx={{
                  display: { xs: "flex", md: "none" },
                }}
                href={`${locale}/app/authentication/login`}
              >
                <LoginIcon fontSize="small" htmlColor={Colors.white} />
              </Button>
              <Button
                variant="outlined"
                sx={{
                  display: { xs: "none", md: "flex" },
                  px: { xs: "none", md: 3 },
                  fontWeight: "bold",
                  color: Colors.dark,
                  backgroundColor: Colors.white,
                  "&:hover": {
                    color: Colors.white,
                  },
                }}
                href={`${locale}/app/authentication/login`}
                data-cy="login-button"
              >
                {t("authentication.login")}
              </Button>
              <LanguageMenuNext basePath="" />
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    );
  },
);
LandingPageAppBar.displayName = "LandingPageAppBar";
