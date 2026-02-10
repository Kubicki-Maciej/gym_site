import { Card, CardContent, Typography, Box } from "@mui/material";

export default function StatisticCard({
  title,
  subtitle,
  children,
  action,
}) {
  return (
    <Card elevation={2}>
      <CardContent>
        {(title || action) && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Box>
              {title && (
                <Typography variant="subtitle2" color="text.secondary">
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography variant="caption" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>

            {action && <Box>{action}</Box>}
          </Box>
        )}

        {children}
      </CardContent>
    </Card>
  );
}
