import { Stack } from "@mui/material";

export default function MacroInlineElement({ children, sx }) {
  return (
    <Stack direction="row" spacing={0.4} alignItems="center" sx={sx}>
      {children}
    </Stack>
  );
}
