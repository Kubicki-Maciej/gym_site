import { useState } from "react";

const useConfirmDialog = () => {
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState({
    title: "Potwierdzenie",
    message: "Czy na pewno?",
    onConfirm: null,
  });

  const openDialog = (title, message, onConfirm) => {
    setDialogData({ title, message, onConfirm });
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if (dialogData.onConfirm) {
      dialogData.onConfirm();
    }
    closeDialog();
  };

  return {
    open,
    dialogData,
    openDialog,
    closeDialog,
    handleConfirm,
  };
};

export default useConfirmDialog;
