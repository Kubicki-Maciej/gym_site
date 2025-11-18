import { useUserContext } from "../../../User/context";

export const useNavItems = () => {
  const { logged } = useUserContext();

  if (logged) {
    return [
      { label: "Home", href: "#home" },
      { label: "Menu", href: "/menu" },
      ,
    ];
  } else {
    return [
      { label: "Home", href: "" },
      { label: "About", href: "about/*" },
      { label: "Contact", href: "#contact" },
    ];
  }
};
