import { GetStaticPropsResult } from "next";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import theme from "@/themes";
import { Box, ThemeProvider } from "@mui/material";
import { useInitializedTranslations } from "@/hooks/useInitializedTranslations";
import { LandingPageAppBar } from "@/components/LandingPageAppBar";
import { AppHead } from "@/components/AppHead";
import { LandingPageContent } from "@/components/LandingPageContent";

type LandingPageProps = {
  locale: string;
};

export default function LandingPage({ locale }: LandingPageProps) {
  useInitializedTranslations();

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <AppHead
          title="Task Tracker"
          description="Task Tracker management tool"
        />
        <Box pt={10} sx={{ backgroundColor: "#FAFAFA", height: "100vh" }}>
          <LandingPageAppBar locale={locale} />
          <LandingPageContent />
        </Box>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export async function getStaticProps({
  locale,
}): Promise<GetStaticPropsResult<LandingPageProps>> {
  return {
    props: {
      locale,
    },
  };
}
