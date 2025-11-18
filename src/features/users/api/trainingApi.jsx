import { API_URL } from "../../../config";

async function getUserUpcomingTraining(id) {
  try {
    const response = await fetch(
      `${API_URL}training/user/upcoming_trainings/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);

    throw error;
  }
}

const trainingApi = { getUserUpcomingTraining };
export default trainingApi;

