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

  addTrainingToTraining: async payload => {
    // return api.put(`training/${userTrainingId}/workout/26/add`);
    return api.put(`training/add_to/workout`, payload);
  },

  createSingleRep: async payload => {
    return api.post(`exercise/create/singleseries/`, payload);
  },

  deleteSeries: async seriesId => {
    (" ping");
    return api.del(`exercise/delete/seriesexercise/${seriesId}`);
  },

  deleteExercise: async exerciseId => {
    return api.del(`training/user-exercise/${exerciseId}`);
  },
};
