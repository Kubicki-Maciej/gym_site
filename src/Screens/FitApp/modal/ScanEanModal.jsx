import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Alert,
  Chip,
  Divider,
} from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import ResponsiveModal from "components/Core/ResponsiveModal";
import BarcodeScanner from "features/BarcodeScaner/BarcodeScanner";
import { useLookupProductByEan } from "hooks/Fitapp/useNutrition";
import { useDiaryMutations } from "hooks/Fitapp/useDiaryMutations";
import CameraTest from "features/BarcodeScaner/CameraTest";

export default function ScanEanModal({ open, onClose }) {
  const { createIngredient } = useDiaryMutations();

  // Stan
  const [ean, setEan] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [weight, setWeight] = useState(100);

  // Lookup
  const {
    data: lookupResult,
    isLoading,
    isError,
    error,
  } = useLookupProductByEan(ean);

  const product = lookupResult?.product;
  const source = lookupResult?.source;

  // Reset
  const resetForm = () => {
    setEan("");
    setWeight(100);
    setScannerOpen(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Skan
  const handleScan = scannedEan => {
    setEan(scannedEan);
    setScannerOpen(false);
  };

  // Dodaj do dziennika
  const handleAdd = () => {
    if (!product?.id || weight <= 0) return;

    createIngredient.mutate(
      {
        // snapshot: snapshotId.snapshot_id,
        product: product.id,
        weight_g: weight,
      },
      {
        onSuccess: () => handleClose(),
      },
    );
  };

  return (
    <ResponsiveModal
      open={open}
      onClose={handleClose}
      title="Skanuj kod EAN"
      renderActions={({ isMobile }) => (
        <Stack direction={isMobile ? "column" : "row"} spacing={2}>
          {!isMobile && (
            <Button variant="outlined" onClick={handleClose} fullWidth>
              Anuluj
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={!product?.id || weight <= 0}
            fullWidth
          >
            Dodaj do posiłku
          </Button>
        </Stack>
      )}
    >
      <Stack spacing={3}>
        {/* ===== SKANER ===== */}
        {scannerOpen ? (
          //   <BarcodeScanner
          //     onScan={handleScan}
          //     onClose={() => setScannerOpen(false)}
          //   />
          // <CameraTest />
          <BarcodeScanner onScan={setEan} />
        ) : (
          <Button
            variant="outlined"
            startIcon={<QrCodeScannerIcon />}
            onClick={() => setScannerOpen(true)}
            fullWidth
            sx={{ py: 2 }}
          >
            Otwórz skaner kamery
          </Button>
        )}

        {/* ===== SEPARATOR ===== */}
        <Divider>
          <Typography variant="caption" color="text.secondary">
            lub wpisz ręcznie
          </Typography>
        </Divider>

        {/* ===== INPUT EAN ===== */}
        <TextField
          label="Kod EAN"
          value={ean}
          onChange={e => {
            const val = e.target.value.replace(/\D/g, "");
            setEan(val);
          }}
          placeholder="np. 5900014002418"
          inputProps={{ maxLength: 13, inputMode: "numeric" }}
          fullWidth
        />

        {/* ===== LOADING ===== */}
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CircularProgress size={32} />
          </Box>
        )}

        {/* ===== BŁĄD ===== */}
        {isError && (
          <Alert severity="error">
            Błąd wyszukiwania: {error?.message || "Spróbuj ponownie"}
          </Alert>
        )}

        {/* ===== NIE ZNALEZIONO ===== */}
        {lookupResult && !product && (
          <Alert severity="warning">
            Nie znaleziono produktu dla EAN: {ean}
          </Alert>
        )}

        {/* ===== ZNALEZIONY PRODUKT ===== */}
        {product && (
          <Box
            sx={{
              p: 2,
              bgcolor: "action.hover",
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
            }}
          >
            <Stack spacing={1}>
              {/* Nagłówek */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {product.name}
                </Typography>
                <Chip
                  size="small"
                  icon={source === "local" ? <CheckCircleIcon /> : null}
                  label={source === "local" ? "Z bazy" : "Znaleziony online"}
                  color={source === "local" ? "success" : "info"}
                  variant="outlined"
                />
              </Stack>

              {/* EAN */}
              <Typography variant="caption" color="text.secondary">
                EAN: {product.ean}
              </Typography>

              {/* Makro na 100g */}
              <Divider />
              <Typography variant="caption" color="text.secondary">
                Wartości na 100g:
              </Typography>
              <Stack direction="row" spacing={2}>
                <Typography variant="body2">
                  🔥 {product.kcal_per_100g} kcal
                </Typography>
                <Typography variant="body2">
                  🥩 {product.protein_per_100g}g B
                </Typography>
                <Typography variant="body2">
                  🍞 {product.carbs_per_100g}g W
                </Typography>
                <Typography variant="body2">
                  🧈 {product.fat_per_100g}g T
                </Typography>
              </Stack>
            </Stack>
          </Box>
        )}

        {/* ===== WAGA ===== */}
        {product && (
          <TextField
            label="Waga (g)"
            type="number"
            value={weight}
            onChange={e => setWeight(Number(e.target.value))}
            inputProps={{ min: 1 }}
            fullWidth
          />
        )}
      </Stack>
    </ResponsiveModal>
  );
}
