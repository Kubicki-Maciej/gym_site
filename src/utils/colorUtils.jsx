const generateColorsList = ranges => {
  const result = [];

  ranges.forEach(({ start, end, colors }) => {
    const count = end - start + 1;

    for (let i = 0; i < count; i++) {
      if (i === 0) {
        result.push(colors.light);
      } else if (i === count - 1) {
        result.push(colors.dark);
      } else {
        result.push(colors.main);
      }
    }
  });

  return result;
};

// Użycie:
const muiColors = {
  primary: { light: "#90caf9", main: "#1976d2", dark: "#0d47a1" },
  success: { light: "#a5d6a7", main: "#2e7d32", dark: "#1b5e20" },
  warning: { light: "#ffcc80", main: "#ed6c02", dark: "#e65100" },
  error: { light: "#ef9a9a", main: "#d32f2f", dark: "#b71c1c" },
};

const ranges = [
  { start: 0, end: 5, colors: muiColors.primary },
  { start: 6, end: 22, colors: muiColors.success },
  { start: 23, end: 29, colors: muiColors.warning },
];

const colorsList = generateColorsList(ranges);
export default colorsList;
