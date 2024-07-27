import { useRouter } from "next/router";
import { Locales } from "@/models/common/Translation";

export const useLanguageMenuNext = () => {
  const router = useRouter();
  const { locale } = router;

  return {
    locale: locale as Locales,
  };
};
