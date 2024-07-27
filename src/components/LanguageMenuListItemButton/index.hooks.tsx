import { useTypedTranslations } from "@/hooks/useTypedTranslations";

export const useLanguageMenuListItemButton = () => {
  const [t] = useTypedTranslations();
  return {
    t,
  };
};
