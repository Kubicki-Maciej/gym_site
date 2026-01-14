import api from "../../../api/client";

export const statisticApi = {
  getUserStatistic: async (userId, year, month) => {
    return api.get(`statistics/stats_user/${userId}/${year}/${month}/`);
  },

  getUserExerciseInDaterangeStatistic: async (
    userId,
    exerciseId,
    dateStart,
    dateEnd
  ) => {
    return api.get(
      `statistics/history/${userId}/${exerciseId}/${dateStart}/${dateEnd}/`
    );
  },
};
