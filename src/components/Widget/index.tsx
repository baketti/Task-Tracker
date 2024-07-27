import React, { memo } from "react";
import { useWidget } from "./index.hooks";
import { Paper, PaperProps } from "@mui/material";

type WidgetProps = {} & PaperProps;

export const Widget = memo(({ sx, ...props }: WidgetProps) => {
  const {} = useWidget();

  return (
    <Paper elevation={4} sx={{ p: 2, borderRadius: 4, ...sx }} {...props} />
  );
});
Widget.displayName = "Widget";
