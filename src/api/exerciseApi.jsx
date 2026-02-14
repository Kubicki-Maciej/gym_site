import api from "./client";

export const exerciseApi = {
  createExercise: async data => {
    return api.post(`exercise/exercise/create`, data);
  },
  getAllExercises: async () => {
    return api.get(`exercise/exercise/all`);
  },

  getExerciseById: async exerciseId => {
    return api.get(`exercise/${exerciseId}`);
  },

  updateExercise: async (exerciseId, data) => {
    return api.put(`exercise/workout/updateexercise/${exerciseId}`, data);
  },
  getUserListExerciseOption: async () => {
    return api.get(`exercise/exercise/all`);
  },
  getMuscles: async () => {
    return api.get(`exercise/muscles/all`);
  },
};
