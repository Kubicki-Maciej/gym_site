import { useUserContext } from '../../components/User/context'


// Components
import UserExerciseStatistics from '../../features/statistics/UserExerciseStatistic'
import UserMuscleUsage from '../../features/statistics/UserMuscleUsage'


// Ui
import FolderTabsMui from '../../components/FolderTabs/TabPanel'

// 

export default function StudentProgressScreen() {
    const {selectedUser} = useUserContext();
    const userId = selectedUser?.id

    const folderContent = [
        {
        label: "📈 Wykresy Postępu w ćwiczeniu",
        content: <UserExerciseStatistics userId={userId}  />,
    },
    // refactor with spider chart create new statistic stats bomb 
    {
      label: "📊 Użycie mieśni",
      content: <UserMuscleUsage userId={userId} />,
    }, 
    ,
    ]

  return (
    <div>Student Progress Screen
       
           <FolderTabsMui tabs={folderContent} />


    </div>
  )
}
