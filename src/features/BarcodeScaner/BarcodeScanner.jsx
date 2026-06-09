import { useZxing } from "react-zxing";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

export default function BarcodeScanner({ onScan }) {
  console.log("isSecureContext:", window.isSecureContext);
  console.log("mediaDevices:", navigator.mediaDevices);
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    paused: false,
    onDecodeResult(result) {
      setResult(result.rawValue);
    },
    constraints: {
      video: {
        facingMode: { ideal: "environment" },
      },
      audio: false,
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
      <p>{result}</p>
      <Typography variant="caption">Skieruj kamerę na kod kreskowy</Typography>
    </Box>
  );
}
