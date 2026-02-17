import api from "./client";

export const userApi = {
  getTrainerStudents: async id => {
    return api.get(`user/students/${id}`);
  },
};
