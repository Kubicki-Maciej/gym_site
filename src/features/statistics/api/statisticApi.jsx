import api from "../../../api/client";

export const statisticApi = {
  getUserStatistic: async (userId, year, month) => {
    console.log({ userId, year, month });
    return api.get(`statistics/stats_user/${userId}/${year}/${month}/`);
  },
};
