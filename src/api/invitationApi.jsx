// api/invitationApi.js
import api from "./client";

export const invitationApi = {
  generateMyCode: async () => {
    return api.post("user/invitation/generate/");
  },

  getMyCode: async () => {
    return api.get("user/invitation/my-code/");
  },

  claimStudent: async code => {
    return api.post("user/invitation/claim/", { code: code.toUpperCase() });
  },
};
