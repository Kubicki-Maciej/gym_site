import api from "../../../api/client";

export const exerciseApi = {
  getUserListExerciseOption: async () => {
    return api.get(`exercise/exercise/all`);
  },
};
