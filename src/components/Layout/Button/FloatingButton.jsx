function FloatingTrainingButton({ count, onClick }) {
  if (count === 0) return null;

  return (
    <Badge
      badgeContent={count}
      color="secondary"
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <Fab color="primary" onClick={onClick}>
        <FitnessCenterIcon />
      </Fab>
    </Badge>
  );
}
