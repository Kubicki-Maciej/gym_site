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
};
