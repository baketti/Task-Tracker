import { i18n } from "@/translations/i18nextSetup";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const useInitializedTranslations = () => {
  const { locale } = useRouter();

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  return null;
};