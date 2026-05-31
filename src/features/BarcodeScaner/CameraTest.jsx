import { useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

export default function CameraTest() {
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);

  const startCamera = async () => {
    setError("");

    try {
      if (!window.isSecureContext) {
        throw new Error(
          "Aplikacja nie działa w secure context (potrzebne HTTPS albo localhost).",
        );
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Przeglądarka nie obsługuje getUserMedia.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setStarted(true);
    } catch (err) {
      console.error("Camera error:", err);
      setError(err?.message || "Nie udało się uruchomić kamery");
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={startCamera}>
        Uruchom kamerę
      </Button>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          width: "100%",
          marginTop: 16,
          borderRadius: 8,
          background: "#000",
          minHeight: 240,
        }}
      />

      {started && <Typography sx={{ mt: 1 }}>Kamera uruchomiona</Typography>}
    </Box>
  );
}
