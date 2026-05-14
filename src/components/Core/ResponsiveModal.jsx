import {
  Dialog,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";

export default function ResponsiveModal({
  open,
  onClose,
  title,
  children,
  renderActions,
  maxWidth = "sm",
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      fullWidth
      maxWidth={maxWidth}
      PaperProps={{
        sx: isMobile
          ? {
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              m: 0,
              borderRadius: 0,
            }
          : {
              width: "100%",
              borderRadius: 2,
            },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: isMobile ? "100dvh" : "auto",
        }}
      >
        {isMobile ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1,
              py: 1.5,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <IconButton onClick={onClose}>
              <ArrowBackIcon />
            </IconButton>

            {title && <Typography variant="h6">{title}</Typography>}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              pb: 0,
            }}
          >
            {title && <Typography variant="h6">{title}</Typography>}

            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: isMobile ? 2 : 3,
            pt: 2,
          }}
        >
          {typeof children === "function" ? children({ isMobile }) : children}
        </Box>

        {renderActions && (
          <Box
            sx={{
              p: isMobile ? 2 : 3,
              pt: isMobile ? 1.5 : 0,
              borderTop: isMobile ? "1px solid" : "none",
              borderColor: "divider",
            }}
          >
            {renderActions({ isMobile })}
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
