import { useUserContext } from "../../../User/context";

export const useNavItems = () => {
  const { logged, user } = useUserContext();

  if (logged) {
    if (user?.is_user_trainer) {
      return [
        // { label: "Strona Startowa", href: "/" },
        { label: "Treningi", href: "/trainingmenu" },
        { label: "Moi Klienci", href: "/clientsmenu" },
        { label: "Kalendarz", href: "/schedule" },
        ,
      ];
    } else {
      return [
        { label: "trainings", href: "/clienttraining" },
        { label: "user1", href: "/" },
        { label: "user2", href: "/" },
      ];
    }
  } else {
    return [
      { label: "Home", href: "" },
      { label: "About", href: "about/" },
      { label: "Contact", href: "#contact" },
    ];
  }
};
