import api from "./client";

export const fitappApi = {
  getProducts: async () => await api.get("api/nutrition/products/"),
  getDiary: async () => await api.get("api/nutrition/diary/"),
  getMeals: async () => await api.get("api/nutrition/meals/"),
  getDiaryEntries: async () => await api.get("api/nutrition/diary_entry/"),

  updateDiaryIngredient: async (id, payload) =>
    await api.patch(`api/nutrition/diary-ingredient/${id}/`, payload),

  createDiaryIngredient: async payload =>
    await api.post(`api/nutrition/diary-ingredient/`, payload),

  deleteDiaryIngredient: async id =>
    await api.delete(`api/nutrition/diary-ingredient/${id}/`),
};
