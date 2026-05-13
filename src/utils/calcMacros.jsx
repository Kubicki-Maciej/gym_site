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

export const calculateTotalMacros = meals => {
  // Używamy metody .reduce() do skumulowania wartości
  const totals = meals.reduce(
    (acc, meal) => {
      // Iterujemy po składnikach danego posiłku
      meal.ingredients.forEach(ingredient => {
        // parseFloat zamienia string "555.75" na liczbę 555.75
        acc.kcal += parseFloat(ingredient.kcal || 0);
        acc.protein += parseFloat(ingredient.protein || 0);
        acc.carbs += parseFloat(ingredient.carbs || 0);
        acc.fat += parseFloat(ingredient.fat || 0);
      });

      return acc;
    },
    { kcal: 0, protein: 0, carbs: 0, fat: 0 },
  ); // Początkowy stan licznika

  // 2. Zaokrąglamy wyniki do 2 miejsc po przecinku (w JS przy ułamkach powstają błędy np. 0.300000004)
  return {
    kcal: totals.kcal.toFixed(2),
    protein: totals.protein.toFixed(2),
    carbs: totals.carbs.toFixed(2),
    fat: totals.fat.toFixed(2),
  };
};
