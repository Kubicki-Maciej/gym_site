import { API_URL } from "../../../config";

export default function userApi() {
  const getTrainerUsers = async id => {
    try {
      const response = await fetch(`${API_URL}user/students/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);

      throw error;
    }
  };
  return {
    getTrainerUsers,
  };
}
