import {
  Dialog,
  Box,
  TextField,
  Typography,
  Stack,
  Button,
} from "@mui/material";

import { useMemo, useState } from "react";
import ResponsiveModal from "components/Core/ResponsiveModal";

export default function ProductPicker({
  open,
  onClose,
  products = [],
  onSelect,
}) {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  return (
    <ResponsiveModal open={open} onClose={onClose} title={"Dodaj składnik"}>
      <Box p={2}>
        <TextField
          fullWidth
          placeholder="Search product..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <Stack spacing={1} mt={2}>
          {filteredProducts.map(product => (
            <Button
              key={product.id}
              variant="outlined"
              onClick={() => {
                onSelect(product);
                onClose();
              }}
              sx={{
                justifyContent: "space-between",
                py: 1.5,
              }}
            >
              <Box textAlign="left">
                <Typography fontWeight={700}>{product.name}</Typography>

                <Typography variant="caption">
                  {product.kcal_per_100g} kcal / 100g
                </Typography>
              </Box>
            </Button>
          ))}
        </Stack>
      </Box>
      {/* </Dialog> */}
    </ResponsiveModal>
  );
}
