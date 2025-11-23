import api from "../../../api/client";

export const userApi = {
  //   getTrainerOnlyUsers: async idTrainer => {
  //     return api.get(`students/${idTrainer}`);
  //   },
  getTrainerStudents: async id => {
    return api.get(`user/students/${id}`);
  },
};
