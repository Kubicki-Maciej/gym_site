import { useZxing } from "react-zxing";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

export default function BarcodeScanner({ onScan }) {
  console.log("isSecureContext:", window.isSecureContext);
  console.log("mediaDevices:", navigator.mediaDevices);
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    paused: false,
    onDecodeResult(decodedResult) {
      const text = decodedResult.getText();

      setResult(text);

      if (onScan) {
        onScan(text);
      }
    },
    straints: {
      video: {
        facingMode: { ideal: "environment" },
      },
      audio: false,
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
      <p>Wynik :</p>
      <p>{result}</p>
      <Typography variant="caption">Skieruj kamerę na kod kreskowy</Typography>
    </Box>
  );
}
