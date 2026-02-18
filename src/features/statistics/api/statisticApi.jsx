import api from "../../../api/client";

export const statisticApi = {
  getUserStatistic: async (userId, year, month) => {
    return api.get(`statistics/stats_user/${userId}/${year}/${month}/`);
  },

  getUserExerciseInDateRangeStatistic: async (
    exerciseId,
    userId,
    startDate,
    endDate,
  ) => {
    return api.get(
      `statistics/history/${userId}/${exerciseId}/${startDate}/${endDate}/`,
    );
  },
  getUserAllExerciseName: async userId => {
    return api.get(`training/user/all_exercise/${userId}`);
  },

  getBodyMeasurements: async (userId, startDate, endDate) => {
    return api.get(
      `statistics/body-measurements/${userId}/${startDate}/${endDate}`,
    );
  },
  createBodyMeasurement: async (userId, data) => {
    return api.post(`statistics/body-measurements/${userId}`, data);
  },
  userBodySummary: async userId => {
    return api.get(`statistics/user_body_summary/${userId}`);
  },

  userExercisePorgressCard: async (userId, exerciseId) => {
    return api.get(`statistics/ user_exercise_progres/${userId}/${exerciseId}`);
  },
};
