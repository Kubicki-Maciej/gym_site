import { useCallback } from "react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import Groups2Icon from "@mui/icons-material/Groups2";
import FormatListBulletedAddIcon from "@mui/icons-material/FormatListBulletedAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import MovingOutlinedIcon from "@mui/icons-material/MovingOutlined";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import StraightenIcon from "@mui/icons-material/Straighten";

export const useSidebarItems = () => {
  const sidebarItems = [
    {
      id: "training",
      name: "Trening",
      icon: FitnessCenterIcon,
      path: "/training",
      submenu: [
        {
          id: "add-training",
          name: "Dodaj trening",
          icon: FitnessCenterIcon,
          path: "training/create",
        },
        {
          id: "edit-training",
          name: "Edytuj trening",
          icon: EditIcon,
          path: "training/edit",
        },
        {
          id: "text-training",
          name: "Text trening",
          icon: TextSnippetIcon,
          path: "training/textcreate",
        },
        {
          id: "add-exercise",
          name: "Dodaj/Edytuj ćwiczenie",
          icon: AddIcon,
          path: "exercise/create",
        },
      ],
    },
    {
      id: "student",
      name: "Student",
      icon: AccountCircleIcon,
      path: "/student",
      submenu: [
        {
          id: "student-profile",
          name: "Profil",
          icon: AccountCircleIcon,
          path: "profile",
        },

        {
          id: "next-workout",
          name: "Najbliższy trening",
          icon: EventRepeatIcon,
          path: "nextworkout",
        },
        {
          id: "meetings-list",
          name: "Lista spotkań",
          icon: FormatListBulletedAddIcon,
          path: "meetings",
        },
        {
          id: "create-training-student",
          name: "Stwórz trening",
          icon: EditCalendarIcon,
          path: "create",
        },
        {
          id: "data-measurement",
          name: "Wymiary",
          icon: StraightenIcon,
          path: "measurement",
        },
        {
          id: "data-student",
          name: "Progres użytkownika",
          icon: MovingOutlinedIcon,
          path: "statistics",
        },
      ],
    },

    {
      id: "clients",
      name: "Moi klienci",
      icon: PeopleIcon,
      path: "/clientsmenu",
      submenu: [
        {
          id: "calendar",
          name: "Zarządzaj studentami",
          icon: Groups2Icon,
          path: "students",
        },
        {
          id: "add-client-cyclic-trainings",
          name: "Dodaj Plan Użytkownikowi",
          icon: EditCalendarOutlinedIcon,
          path: "plan/create",
        },
      ],
    },
  ];

  const getItemById = useCallback(id => {
    return sidebarItems.find(item => item.id === id);
  }, []);

  const getSubmenuItems = useCallback(parentId => {
    const parent = sidebarItems.find(item => item.id === parentId);
    return parent?.submenu || [];
  }, []);

  return {
    sidebarItems,
    getItemById,
    getSubmenuItems,
  };
};
