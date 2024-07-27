import React, { memo } from "react";
import { useLanguageMenuListItemButton } from "./index.hooks";
import { Locales } from "@/models/common/Translation";
import { ListItemButton, ListItemIcon, Box, ListItemText } from "@mui/material";
import { Language } from "@/models/client/Language";

type LanguageMenuListItemButtonProps = {
  language: Locales;
  locale: Locales;
  isInSpa?: boolean;
  onLangChange?: (lang: Locales) => void;
};

export const LanguageMenuListItemButton = memo(
  ({
    language,
    locale,
    isInSpa,
    onLangChange,
  }: LanguageMenuListItemButtonProps) => {
    const { t } = useLanguageMenuListItemButton();

    return (
      <ListItemButton
        onClick={isInSpa ? () => onLangChange(locale) : undefined}
        selected={language === locale}
        sx={{
          padding: "2px 20px",
        }}
      >
        <ListItemIcon
          sx={{
            padding: "5px",
          }}
        >
          <Box
            component="img"
            src={Language.getFlagIconByLanguageValue(language)}
            alt={Language.getLanguageNameByLanguageValue(language)}
            sx={{
              width: 28,
              height: 22,
              borderRadius: "2px",
            }}
          />
        </ListItemIcon>
        <ListItemText>
          {language === Locales.EN ? t("lang.en") : t("lang.it")}
        </ListItemText>
      </ListItemButton>
    );
  },
);
LanguageMenuListItemButton.displayName = "LanguageMenuListItemButton";
