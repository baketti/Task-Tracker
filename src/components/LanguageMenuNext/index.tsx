import React, { memo } from "react";
import { useLanguageMenuNext } from "./index.hooks";
import { Locales } from "@/models/common/Translation";
import { List } from "@mui/material";
import Link from "next/link";
import { LanguageMenu } from "../LanguageMenu";
import { LanguageMenuListItemButton } from "../LanguageMenuListItemButton";
import { Colors } from "@/themes";

type LanguageMenuNextProps = {
  basePath?: string;
};

export const LanguageMenuNext = memo(({ basePath }: LanguageMenuNextProps) => {
  const { locale } = useLanguageMenuNext();

  return (
    <LanguageMenu currentLanguage={locale}>
      <List disablePadding>
        {Object.values(Locales).map((newLanguage, index) => (
          <Link key={newLanguage} href={basePath || ""} locale={newLanguage}>
            <LanguageMenuListItemButton
              key={locale}
              language={newLanguage}
              locale={locale}
            />
          </Link>
        ))}
      </List>
    </LanguageMenu>
  );
});
LanguageMenuNext.displayName = "LanguageMenuNext";
