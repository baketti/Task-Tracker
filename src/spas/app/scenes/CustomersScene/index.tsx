import React, { memo } from "react";
import { useCustomersScene } from "./index.hooks";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Paper, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CreateCustomerDialog } from "@/components/CreateCustomerDialog";
import { EditCustomerDialog } from "@/components/EditCustomerDialog";
import { Widget } from "@/components/Widget";

type CustomersSceneProps = {};

export const CustomersScene = memo(({}: CustomersSceneProps) => {
  const {
    t,
    columns,
    handleOpenCreateCustomerDialog,
    customersRows,
    DeleteCustomerDialog,
  } = useCustomersScene();

  return (
    <>
      <Widget
        sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Button
          sx={{ alignSelf: "flex-end", maxWidth: "240px" }}
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleOpenCreateCustomerDialog}
        >
          {t("customers.add")}
        </Button>
        <Stack spacing={2} sx={{ width: "100%", display: "grid", flex: 1 }}>
          <DataGrid
            columns={columns}
            rows={customersRows}
            sx={{ flex: 1 }}
            autoPageSize
          />
        </Stack>
      </Widget>
      <CreateCustomerDialog />
      <EditCustomerDialog />
      {DeleteCustomerDialog}
    </>
  );
});

CustomersScene.displayName = "CustomersScene";
