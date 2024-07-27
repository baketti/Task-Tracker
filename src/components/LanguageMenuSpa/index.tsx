import React, { memo } from "react";
import { useLanguageMenuSpa } from "./index.hooks";
import { List } from "@mui/material";
import { Locales } from "@/models/common/Translation";
import { LanguageMenu } from "../LanguageMenu";
import { LanguageMenuListItemButton } from "../LanguageMenuListItemButton";
import { Colors } from "@/themes";

type LanguageMenuSpaProps = {};

export const LanguageMenuSpa = memo(({}: LanguageMenuSpaProps) => {
  const { languageCode, handleChangeLanguage } = useLanguageMenuSpa();

  return (
    <LanguageMenu currentLanguage={languageCode}>
      <List disablePadding>
        {Object.values(Locales).map((locale) => (
          <LanguageMenuListItemButton
            key={locale}
            language={locale}
            locale={languageCode}
            isInSpa={true}
            onLangChange={() => handleChangeLanguage(locale)}
          />
        ))}
      </List>
    </LanguageMenu>
  );
});

LanguageMenuSpa.displayName = "LanguageMenuSpa";
