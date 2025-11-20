import { useUserContext } from "../../../User/context";

export const useNavItems = () => {
  const { logged } = useUserContext();

  if (logged) {
    return [
      { label: "Home", href: "/" },
      { label: "Menu", href: "/menu" },
      { label: "Training", href: "/training" },
      { label: "Schedule", href: "/schedule" },
      ,
    ];
  } else {
    return [
      { label: "Home", href: "" },
      { label: "About", href: "about/" },
      { label: "Contact", href: "#contact" },
    ];
  }
};
