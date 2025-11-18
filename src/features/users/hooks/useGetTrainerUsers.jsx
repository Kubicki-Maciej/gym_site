// import trainingApi from "../api/trainingApi";
import userApi from "../api/userApi";
import { useState, useEffect } from "react";

export default function useGetTrainerUsers(id) {
  const { getTrainerUsers } = userApi;
  const [trainer, setTrainer] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getTrainerUsers(id);
        console.log("data");
        console.log(data);
        setTrainer(data.trainer);
        setUsers(data.students);
      } catch (error) {
        console.error("Error fetching trainer users:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [id, getTrainerUsers]);

  return { trainer, users, loading, error };
}
