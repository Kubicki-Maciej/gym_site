import { useMemo } from "react";

// ===== utils =====
const calculate1RM = (weight, reps) => Math.round(weight * (1 + reps / 30));

const average = arr =>
  arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

// ===== hook =====
export default function  useExerciseAnalysis(history, options = {}){
  const {
    rollingWindow = 3,
    plateauSessions = 3,
    minWeightJump = 2.5,
  } = options;

  return useMemo(() => {
    if (!history || history.length === 0) return null;

    // =========================
    // 1️⃣ Spłaszczone sety
    // =========================
    const allSets = history.flatMap(session =>
      session.sets.map(set => ({
        ...set,
        oneRM: calculate1RM(set.weight, set.repeats),
        date: session.date,
      }))
    );


    // =========================
    // 2️⃣ Best / Worst set
    // =========================
    const bestSet = allSets.reduce((a, b) =>
      b.weight > a.weight ? b : a
    );

    const worstSet = allSets.reduce((a, b) =>
      b.weight < a.weight ? b : a
    );

    const best1RM = calculate1RM(bestSet.weight, bestSet.repeats);
    const worst1RM = calculate1RM(worstSet.weight, worstSet.repeats);

    const strengthGrowthPercent =
      ((best1RM - worst1RM) / worst1RM) * 100;

    // =========================
    // 3️⃣ Sesje – max set + 1RM
    // =========================
    const sessionStats = history.map(session => {
      const maxSet = session.sets.reduce((a, b) =>
        b.weight > a.weight ? b : a
      );

      const volume = session.sets.reduce(
        (sum, s) => sum + s.weight * s.repeats,
        0
      );

      return {
        date: session.date,
        weight: maxSet.weight,
        reps: maxSet.repeats,
        oneRM: calculate1RM(maxSet.weight, maxSet.repeats),
        volume,
        setsCount: session.sets.length,
      };
    });

    // =========================
    // 4️⃣ Średnie i rolling stats
    // =========================
    const average1RM = average(sessionStats.map(s => s.oneRM));
    const averageVolume = average(sessionStats.map(s => s.volume));

    const rollingStats = sessionStats.slice(-rollingWindow);
    const rollingMax1RM = Math.max(...rollingStats.map(s => s.oneRM));
    const rollingAvg1RM = average(rollingStats.map(s => s.oneRM));

    // =========================
    // 5️⃣ Tempo progresu
    // =========================
    let trendPerDay = null;
    if (sessionStats.length >= 2) {
      const last = sessionStats.at(-1);
      const prev = sessionStats.at(-2);

      const days =
        (new Date(last.date) - new Date(prev.date)) /
        (1000 * 60 * 60 * 24);

      trendPerDay = days > 0 ? (last.oneRM - prev.oneRM) / days : 0;
    }

    // =========================
    // 6️⃣ Plateau detection
    // =========================
    const lastWeights = sessionStats
      .slice(-plateauSessions)
      .map(s => s.weight);

    const isPlateau =
      lastWeights.length === plateauSessions &&
      lastWeights.every(w => w === lastWeights[0]);

    // =========================
    // 7️⃣ Histogramy
    // =========================
    const weightHistogram = {};
    const repsHistogram = {};

    allSets.forEach(set => {
      weightHistogram[set.weight] =
        (weightHistogram[set.weight] || 0) + 1;

      repsHistogram[set.repeats] =
        (repsHistogram[set.repeats] || 0) + 1;
    });

    // =========================
    // 8️⃣ Predykcja progresu
    // =========================
    const lastSession = sessionStats.at(-1);
    let predictedNextWeight = lastSession.weight;

    if (isPlateau) {
      predictedNextWeight += minWeightJump;
    }

    const predictedNext1RM = calculate1RM(
      predictedNextWeight,
      lastSession.reps
    );

    // =========================
    // 9️⃣ Progres sesji
    // =========================
    let progressiveSessions = 0;
    let regressiveSessions = 0;

    for (let i = 1; i < sessionStats.length; i++) {
      if (sessionStats[i].oneRM > sessionStats[i - 1].oneRM)
        progressiveSessions++;
      if (sessionStats[i].oneRM < sessionStats[i - 1].oneRM)
        regressiveSessions++;
    }

    // =========================
    // 🔟 Zwracany obiekt
    // =========================
    return {
      // core
      allSets,
      bestSet,
      worstSet,
      best1RM,
      worst1RM,
      strengthGrowthPercent,

      // sesje
      sessionStats,

      // średnie
      average1RM,
      averageVolume,

      // rolling
      rollingMax1RM,
      rollingAvg1RM,

      // progres
      trendPerDay,
      progressiveSessions,
      regressiveSessions,
      isPlateau,

      // volume
      totalVolume: sessionStats.reduce((a, b) => a + b.volume, 0),

      // histogramy
      weightHistogram,
      repsHistogram,

      // predykcja
      prediction: {
        nextWeight: predictedNextWeight,
        next1RM: predictedNext1RM,
      },
    };
  }, [history, rollingWindow, plateauSessions, minWeightJump]);
};
