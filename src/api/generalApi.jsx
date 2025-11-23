import api from "./client";
export const generalApi = {
  getMuscles: async () => {
    return api.get(`exercise/muscles/all`);
  },
};
