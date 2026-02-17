// Components
import UserExerciseStatistics from "../../features/statistics/UserExerciseStatistic";
import UserMuscleUsage from "../../features/statistics/UserMuscleUsage";
import ExerciseAnalysis from "../../features/statistics/ExerciseAnalysis";
import useSelectedUser from "hooks/useSelectedUser";

// Ui
import FolderTabsMui from "../../components/FolderTabs/TabPanel";

//

export default function StudentProgressScreen() {
  const { isLoading, getSelectedUserFromLocalStorage } = useSelectedUser();
  const userId = getSelectedUserFromLocalStorage();
  if (isLoading) return <p>Loading...</p>;

  if (!userId) return <p>nie ma uzytkownika</p>;

  const folderContent = userId
    ? [
        {
          label: "📈 Wykresy Postępu w ćwiczeniu",
          content: <UserExerciseStatistics userId={userId} />,
        },
        // refactor with spider chart create new statistic stats bomb
        {
          label: "📊 Użycie mieśni",
          content: <UserMuscleUsage userId={userId} />,
        },
      ]
    : [];

  return (
    <>
      <FolderTabsMui tabs={folderContent} />
    </>
  );
}
