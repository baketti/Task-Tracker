import React, { useCallback, useMemo, useRef } from "react";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { useDispatch, useSelector } from "react-redux";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";
import { actions, selectors } from "@/spas/app/redux-store";
import { GridColDef } from "@mui/x-data-grid";
import { Box, IconButton, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useConfirmDialog from "@/hooks/useConfirmDialog";
import { ObjectIdFe } from "@/models/common/JsUtility";

export const useCustomersScene = () => {
  const [t] = useTypedTranslations();
  const dispatch = useDispatch();
  const customers = useSelector(selectors.getCustomersList);

  const handleOpenEditCustomerDialog = useCallback(
    (editCustomerId) => {
      dispatch(actions.setEditCustomerId(editCustomerId));
      dispatch(
        actions.setDialogOpen({
          dialogType: DialogTypes.EDIT_CUSTOMER,
          open: true,
        }),
      );
    },
    [dispatch],
  );

  const deleteCustomerIdRef = useRef<ObjectIdFe>(null);

  const handleDeleteCustomer = useCallback(() => {
    dispatch(
      actions.deleteCustomersByCustomerId.request({
        customerId: deleteCustomerIdRef.current,
      }),
    );
  }, [dispatch]);
  const { show: handleOpenDeleteCustomerDialog, dialog: DeleteCustomerDialog } =
    useConfirmDialog({
      onConfirm: handleDeleteCustomer,
      onCancel: () => null,
      content: t("customers.deleteTitle"),
    });

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "logoUrl",
        headerName: t("customers.logoUrl"),
        renderCell: (params) => (
          <Box
            component="img"
            alt={params.row.name}
            src={params.value}
            sx={{ width: 50, heigth: 50 }}
          />
        ),
      },
      {
        field: "name",
        headerName: t("customers.name"),
        flex: 1,
        minWidth: 150,
      },
      {
        field: "editCustomer",
        headerName: "",
        renderCell: (params) => {
          return (
            <IconButton
              color="warning"
              onClick={() => handleOpenEditCustomerDialog(params.row.id)}
            >
              <EditIcon />
            </IconButton>
          );
        },
      },
      {
        field: "deleteCustomer",
        headerName: "",
        renderCell: (params) => {
          return (
            <IconButton
              color="error"
              onClick={() => {
                deleteCustomerIdRef.current = params.row.id;
                handleOpenDeleteCustomerDialog();
              }}
            >
              <DeleteIcon />
            </IconButton>
          );
        },
      },
    ],
    [handleOpenDeleteCustomerDialog, handleOpenEditCustomerDialog, t],
  );

  const customersRows = useMemo(
    () =>
      customers.map((c) => ({
        id: c._id,
        name: c.name,
        logoUrl: c.logoUrl,
      })),
    [customers],
  );

  const handleOpenCreateCustomerDialog = useCallback(() => {
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_CUSTOMER,
        open: true,
      }),
    );
  }, [dispatch]);

  return {
    columns,
    t,
    handleOpenCreateCustomerDialog,
    customersRows,
    DeleteCustomerDialog,
  };
};
