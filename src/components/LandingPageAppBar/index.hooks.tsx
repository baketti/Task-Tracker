import { useTypedTranslations } from "@/hooks/useTypedTranslations";

export const useLandingPageAppBar = () => {
  const [t] = useTypedTranslations();

  return { t };
};
