import { isThisWeek, format } from "date-fns";
import { pl } from "date-fns/locale";

export default function useGetLastSevenDayTrainings() {
  // from training/user/upcoming_trainings data

  const getThisWeekTrainings = trainings => {
    return trainings
      .filter(training => isThisWeek(new Date(training.training_date)))
      .map(training => ({
        ...training,
        formatted_date: format(
          new Date(training.training_date),
          "EEEE, dd MMMM yyyy HH:mm",
          { locale: pl },
        ),
      }));
  };

  const getListToWeekDayInitialsStrip = trainings => {
    const today = new Date();
    const currentDay = today.getDay();

    const weekStart = new Date(today);
    weekStart.setDate(
      today.getDate() - (currentDay === 0 ? 6 : currentDay - 1),
    );
    weekStart.setHours(0, 0, 0, 0);

    const daysOfWeek = [
      { key: "p", name: "poniedziałek" },
      { key: "w", name: "wtorek" },
      { key: "ś", name: "środa" },
      { key: "czw", name: "czwartek" },
      { key: "pt", name: "piątek" },
      { key: "sb", name: "sobota" },
      { key: "nd", name: "niedziela" },
    ];

    const getDateOnly = dateString => {
      const date = new Date(dateString);
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };

    const trainingsByDate = {};
    trainings.forEach(training => {
      const dateOnly = getDateOnly(training.training_date);
      const dateKey = dateOnly.toISOString().split("T")[0];

      trainingsByDate[dateKey] = training;
    });

    const weekMap = daysOfWeek.map((day, index) => {
      const dayDate = new Date(weekStart);
      dayDate.setDate(weekStart.getDate() + index);
      const dateKey = dayDate.toISOString().split("T")[0];

      const trainingForDay = trainingsByDate[dateKey];

      return {
        key: day.key,
        object: trainingForDay
          ? {
              ...trainingForDay,
              formatted_date: new Date(
                trainingForDay.training_date,
              ).toLocaleDateString("pl-PL", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : "",
      };
    });

    return weekMap;
  };

  const getTime = dateString =>
    new Date(dateString).toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return { getThisWeekTrainings, getListToWeekDayInitialsStrip, getTime };
}
