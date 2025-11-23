import React from "react";
import api from "../../../api/client";

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
};
