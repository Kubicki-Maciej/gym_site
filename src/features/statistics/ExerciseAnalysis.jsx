import useExerciseAnalysis from "../../hooks/useExerciseAnalysis";
import useUserExerciseInDateRangeStatistic from "hooks/useUserExerciseInDateRangeStatistic";
import QueryStateHandler from "../../components/QueryStateHandler/QueryStateHandler";

import { BarChart, LineChart, XAxis, YAxis, Bar, Line } from "recharts";
import OneRMChart from "./charts/OneRMChart";

export default function ExerciseAnalysis({ userId, exerciseId }) {
  const {
    data: statisticsData,
    isLoading: isStatsLoading,
    isError: isStatsError,
    error: statsError,
  } = useUserExerciseInDateRangeStatistic({
    userId,
    exerciseId,
    startDate: "2026-01-01",
    endDate: "2026-02-25",
  });
  console.log("Exercise analysis");

  const analysis = useExerciseAnalysis(statisticsData?.history ?? []);

  return (
    <div>
      ExerciseAnalysis
      <>
        <QueryStateHandler
          isLoading={isStatsLoading}
          isError={isStatsError}
          error={statsError}
        >
          {analysis?.sessionStats?.length > 0 && (
            <>
              <LineChart width={400} height={300} data={analysis.sessionStats}>
                <XAxis />
                <YAxis />
                <Line dataKey="volume" stroke="#82ca9d" />
              </LineChart>
              <pre>{JSON.stringify(analysis.sessionStats, null, 2)}</pre>
              <OneRMChart
                data={analysis.sessionStats}
                predicted1RM={analysis.prediction?.next1RM} // optional chaining!
              />
              <pre>{JSON.stringify(statisticsData.history, null, 2)}</pre>
              average1RM{analysis.average1RM}
              <h6>trendPerDay</h6>
              <pre>{JSON.stringify(analysis.trendPerDay, null, 2)}</pre>
              <h6>progressiveSessions</h6>
              <pre>{JSON.stringify(analysis.progressiveSessions, null, 2)}</pre>
              <h6>weightHistogram</h6>
              <pre>{JSON.stringify(analysis.weightHistogram, null, 2)}</pre>
              <h6>allSets</h6>
              <pre>{JSON.stringify(analysis.allSets, null, 2)}</pre>
            </>
          )}
        </QueryStateHandler>
      </>
    </div>
  );
}
