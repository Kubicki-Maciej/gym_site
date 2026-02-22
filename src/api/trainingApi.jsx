import api from "./client";

export const trainingApi = {
  // Pobierz trening użytkownika
  getUserDataTraining: async id => {
    return api.get(`training/user/${id}`);
  },

  // Pobierz nadchodzące treningi użytkownika
  getUserUpcomingTraining: async id => {
    return api.get(`training/user/upcoming_trainigs/${id}`);
  },

  // Pobierz wszystkie treningi użytkownika
  getUserAllDataTraining: async id => {
    return api.get(`training/user/all_trainings/${id}`);
  },

  // Utwórz wiele treningów
  createMultipleTrainings: async data => {
    return api.post(`training/user/create_multiple_trainings`, data);
  },

  // Pobierz nadchodzące treningi trenera
  getUpcomingTrainerWorkouts: async id => {
    return api.get(`training/upcoming_trainings/${id}`);
  },

  // Pobierz wszystkie treningi studenta
  getStudentAllTraining: async id => {
    return api.get(`training/get_student_all_training/${id}`);
  },

  // Zaktualizuj trening
  updateTraining: async (trainingId, data) => {
    return api.put(`training/update_user_training/${trainingId}/`, data);
  },

  // Ćwiczenia
  getAllExercises: async () => {
    return api.get(`exercise/exercise/all`);
  },

  getExerciseById: async exerciseId => {
    return api.get(`exercise/${exerciseId}`);
  },

  updateExercise: async (serieId, data) => {
    return api
      .put(`exercise/workout/updateexercise/${serieId}`, data)
      .then(res => {
        return res;
      });
  },

  addExerciseToTraining: async (idUserTraining, idExercise) => {
    return api.post(`exercise/workout/addexercise`, {
      idUserTraining,
      idExercise,
      repeats: 3,
    });
  },

  createSingleRep: async data => {
    return api.post(`exercise/add_rep`, data);
  },

  deleteSeriesExercise: async exerciseId => {
    return api.del(`exercise/delete/seriesexercise/${exerciseId}`);
  },

  deleteSingleExercise: async exerciseId => {
    return api.del(`exercise/delete/singleseries/${exerciseId}`);
  },

  createTraining: async data => {
    return api.post(`training/create_training`, data);
  },

  updateMainTraining: async data => {
    return api.put(`training/create_training`, data);
  },

  userTrainingsInDateRange: async (userId, data) => {
    return api.get(
      `training/user/trainings_in_date_range/${userId}/?start_date=${data.start_date}&end_date=${data.end_date}`,
    );
  },

  getUserRecentExercise: async (userId, exerciseId, trainingId) => {
    return api.get(
      `exercise/recent_exercise/${exerciseId}/user/${userId}/training/${trainingId}`,
    );
  },

  checkUserTrainingAccess: async (userId, trainingId) => {
    return api.get(`training/user_training_access/${userId}/${trainingId}`);
  },

  createTrainingFromText: async rawInput => {
    return api.post("training/create_training_from_text", {
      raw_input: rawInput,
    });
  },
};
