import { useCallback, useMemo, useRef, useState } from "react";
import { PopoverOrigin } from "@mui/material";

const useLanguageMenu = () => {
  const anchorRef = useRef();

  const [isLanguageSelectorMenuOpen, setIsLanguageSelectorMenuOpen] =
    useState(false);

  const anchorOrigin = useMemo<PopoverOrigin>(
    () => ({ vertical: "bottom", horizontal: "right" }),
    [],
  );
  const transformOrigin = useMemo<PopoverOrigin>(
    () => ({ vertical: "top", horizontal: "right" }),
    [],
  );
  const handleLanguageSelectorMenuOpen = useCallback(
    () => setIsLanguageSelectorMenuOpen(true),
    [],
  );
  const handleLanguageSelectorMenuClose = useCallback(
    () => setIsLanguageSelectorMenuOpen(false),
    [],
  );

  return {
    anchorOrigin,
    transformOrigin,
    anchorRef,
    isLanguageSelectorMenuOpen,
    handleLanguageSelectorMenuOpen,
    handleLanguageSelectorMenuClose,
  };
};

export { useLanguageMenu as default };
