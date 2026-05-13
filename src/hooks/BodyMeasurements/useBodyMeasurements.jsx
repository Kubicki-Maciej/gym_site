import { useEffect, useState, useCallback } from "react";
import { statisticApi } from "features/statistics/api/statisticApi";

export const useBodyMeasurements = (userId, startDate, endDate) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMeasurements = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await statisticApi.getBodyMeasurements(
        userId,
        startDate,
        endDate,
      );

      setData(data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(userId), startDate, endDate]);

  useEffect(() => {
    fetchMeasurements();
  }, [fetchMeasurements]);

  return {
    data,
    loading,
    error,
    refetch: fetchMeasurements,
  };
};
