import { useCallback } from "react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

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
          icon: AddIcon,
          path: "training/create",
        },
        {
          id: "edit-training",
          name: "Edytuj trening",
          icon: EditIcon,
          path: "training/edit",
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
      id: "clients",
      name: "Moi klienci",
      icon: PeopleIcon,
      path: "/clients",
      submenu: [
        {
          id: "calendar",
          name: "Test Student Page",
          // name: "Kalendarz spotkań",
          icon: CalendarTodayIcon,
          path: "student",
        },
        {
          id: "create-meeting",
          name: "Test user Profile",
          // name: "Stwórz spotkanie",
          icon: AddIcon,
          path: "userprofile",
        },
        {
          id: "add-client",
          name: "Dodaj klienta",
          icon: PersonAddIcon,
          path: "workout/create",
        },
        {
          id: "add-client-cyclic-trainings",
          name: "Dodaj Plan Użytkownikowi",
          icon: PersonAddIcon,
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
