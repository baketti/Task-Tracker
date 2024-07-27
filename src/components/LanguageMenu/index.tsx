import React, { memo } from "react";
import useLanguageMenu from "./index.hooks";
import { Box, IconButton, Menu } from "@mui/material";
import { Language } from "@/models/client/Language";
import { Locales } from "@/models/common/Translation";

type LanguageMenuProps = {
  currentLanguage: Locales;
  children: React.ReactNode;
};

export const LanguageMenu = memo(
  ({ currentLanguage, children }: LanguageMenuProps) => {
    const {
      anchorOrigin,
      transformOrigin,
      anchorRef,
      isLanguageSelectorMenuOpen,
      handleLanguageSelectorMenuOpen,
      handleLanguageSelectorMenuClose,
    } = useLanguageMenu();

    return (
      <>
        <IconButton
          ref={anchorRef}
          onClick={handleLanguageSelectorMenuOpen}
          sx={{
            width: 44,
            height: 44,
          }}
          size="medium"
        >
          <Box
            component="img"
            src={Language.getFlagIconByLanguageValue(currentLanguage)}
            alt={Language.getLanguageNameByLanguageValue(currentLanguage)}
            sx={{
              width: 28,
              height: 22,
              borderRadius: "2px",
            }}
          />
        </IconButton>
        <Menu
          id="menu-language"
          anchorEl={anchorRef.current}
          open={isLanguageSelectorMenuOpen}
          onClose={handleLanguageSelectorMenuClose}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
        >
          {children}
        </Menu>
      </>
    );
  },
);

LanguageMenu.displayName = "LanguageMenu";
