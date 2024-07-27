import React, { ReactNode, useCallback, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";

type useConfirmDialogProps = {
  onConfirm: () => void;
  onCancel: () => void;
  content: ReactNode;
  cancelText?: string;
  confirmText?: string;
};

const useConfirmDialog = ({
  onConfirm,
  onCancel,
  content,
  cancelText,
  confirmText,
}: useConfirmDialogProps) => {
  const [t] = useTypedTranslations();
  const [open, setOpen] = useState(false);

  const show = useCallback(() => {
    setOpen(true);
  }, []);

  const onConfirmInternal = useCallback(() => {
    setOpen(false);
    onConfirm();
  }, [onConfirm]);

  const onCancelInternal = useCallback(() => {
    setOpen(false);
    onCancel();
  }, [onCancel]);

  return {
    open,
    show,
    dialog: (
      <Dialog open={open}>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="outlined"
            onClick={onCancelInternal}
          >
            {cancelText ?? t("generic.cancel")}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={onConfirmInternal}
          >
            {confirmText ?? t("generic.confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    ),
  };
};

export default useConfirmDialog;
