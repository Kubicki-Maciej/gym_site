import { useZxing } from "react-zxing";
import { Box, Typography } from "@mui/material";

export default function BarcodeScanner({ onScan }) {
  console.log("isSecureContext:", window.isSecureContext);
  console.log("mediaDevices:", navigator.mediaDevices);
  const { ref } = useZxing({
    paused: false,
    constraints: {
      video: {
        facingMode: { ideal: "environment" }, // tylna kamera
      },
      audio: false,
    },
    onDecodeResult(result) {
      const text = result.getText();
      if (text) {
        onScan(text);
      }
    },
    onError(error) {
      console.error("ZXing error:", error);
    },
  });

  return (
    <Box>
      <video
        ref={ref}
        style={{ width: "100%", borderRadius: 8 }}
        autoPlay
        muted
        playsInline
      />
      <Typography variant="caption">Skieruj kamerę na kod kreskowy</Typography>
    </Box>
  );
}
