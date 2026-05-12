export const calculateIngredientMacros = (product, weight) => {
  const factor = weight / 100;

  return {
    kcal: product.kcal_per_100g * factor,
    protein: product.protein_per_100g * factor,
    carbs: product.carbs_per_100g * factor,
    fat: product.fat_per_100g * factor,
  };
};

export const calculateSnapshotTotals = ingredients => {
  return ingredients.reduce(
    (acc, ing) => {
      acc.kcal += ing.kcal;
      acc.protein += ing.protein;
      acc.carbs += ing.carbs;
      acc.fat += ing.fat;
      return acc;
    },
    { kcal: 0, protein: 0, carbs: 0, fat: 0 },
  );
};
