import React, { memo } from "react";
import { useLandingPageContent } from "./index.hooks";
import { Stack, Typography, Box } from "@mui/material";
import { TaskTrackerLogo } from "../TaskTrackerLogo";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";

type LandingPageContentProps = {};

export const LandingPageContent = memo(({}: LandingPageContentProps) => {
  const { t, logoRef, titleRef, subTitleRef, githubIconRef } =
    useLandingPageContent();

  return (
    <Stack
      sx={{
        my: { xs: 6, sm: 10 },
        width: "100%",
        alignItems: "center",
      }}
      spacing={2}
    >
      <Box ref={logoRef} sx={{ display: "none" }}>
        <TaskTrackerLogo />
      </Box>
      <Stack sx={{ maxWidth: "75%", textAlign: "center" }} spacing={2}>
        <Typography
          ref={titleRef}
          sx={{ display: "none" }}
          variant="h1"
          color="text.primary"
        >
          {t("home.welcome")}
        </Typography>
        <Typography
          ref={subTitleRef}
          sx={{ display: "none" }}
          variant="subtitle1"
          color="text.primary"
        >
          {t("home.tutorial")}
        </Typography>
      </Stack>
      <Stack direction="row" position="absolute" bottom={20}>
        <Box ref={githubIconRef} sx={{ display: "none" }}>
          <Link href="https://github.com/baketti" target="_blank">
            <GitHubIcon
              sx={{
                cursor: "pointer",
                color: "black",
                width: { xs: "35px", sm: "55px" },
                height: { xs: "35px", sm: "55px" },
              }}
            />
          </Link>
        </Box>
      </Stack>
    </Stack>
  );
});
LandingPageContent.displayName = "LandingPageContent";
