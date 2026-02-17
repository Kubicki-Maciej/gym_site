import { useState } from "react";
import { statisticApi } from "features/statistics/api/statisticApi";

export const useCreateBodyMeasurement = userId => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createMeasurement = async payload => {
    setLoading(true);
    setError(null);

    try {
      const res = await statisticApi.createBodyMeasurement(userId, payload);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createMeasurement,
    loading,
    error,
  };
};
