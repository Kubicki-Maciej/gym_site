import { useState } from "react";

export default function useSnackbarAlerts() {
  const [statusAlert, setStatusAlert] = useState({
    open: false,
    message: "",
    severity: "success",
    autoHideDuration: 4000,
  });
  const showAlert = (
    message,
    severity = "success",
    autoHideDuration = 4000
  ) => {
    setStatusAlert({
      open: true,
      message,
      severity,
      autoHideDuration,
    });
  };

  const handleCloseAlert = () => {
    setStatusAlert({ ...statusAlert, open: false });
  };

  return {
    statusAlert,
    showAlert,
    handleCloseAlert,
  };
}
