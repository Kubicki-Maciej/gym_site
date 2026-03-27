import { useUserContext } from "components/User/context";

export const useNavItems = () => {
  const { logged, user } = useUserContext();

  if (logged) {
    if (user?.is_user_trainer) {
      return [
        { label: "Treningi", href: "/trainingmenu" },
        { label: "Moi Klienci", href: "/clientsmenu" },
        { label: "Kalendarz", href: "/schedule" },
        ,
      ];
    } else {
      return [
        { label: "Treningi", href: "/student-training-menu" },
        { label: "Fitapp", href: "/fitapp" },
        { label: "Wymiary", href: "" },
        { label: "Ustawienia", href: "/settings" },
      ];
    }
  } else {
    return [
      { label: "Home", href: "" },
      { label: "O nas", href: "about/" },
    ];
  }
};
