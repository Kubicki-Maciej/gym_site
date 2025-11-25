// api/trainingApi.js
import api from "./client";

export const workoutApi = {
  getUserTraining: async trainingId => {
    return api.get(`training/user/${trainingId}`);
  },

  getAllTrainings: async () => {
    return api.get(`training/all`);
  },

  updateTraining: async (trainingId, data) => {
    return api.put(`training/update_user_training/${trainingId}`, data);
  },

  addExerciseToTraining: async (trainingId, exerciseId) => {
    return api.put(`training/update_user_training/${trainingId}`, {
      exerciseId,
    });
  },

  addTrainingToTraining: async (userTrainingId, trainingId) => {
    return api.post(`training/${userTrainingId}/workoutId/${trainingId}`);
  },

  createSingleRep: async payload => {
    return api.post(`exercise/create/singleseries/`, payload);
  },

  deleteSeries: async seriesId => {
    return api.del(`exercise/delete/singleseries/${seriesId}`);
  },

  deleteExercise: async exerciseId => {
    return api.del(`training/user-exercise/${exerciseId}`);
  },
};
