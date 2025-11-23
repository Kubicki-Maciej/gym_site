import { useUserContext } from "../../../User/context";

export const useNavItems = () => {
  const { logged } = useUserContext();

  if (logged) {
    return [
      // { label: "Strona Startowa", href: "/" },
      { label: "Treningi", href: "/trainingmenu" },
      { label: "Moi Klienci", href: "/clientsmenu" },
      { label: "Kalendarz", href: "/schedule" },
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

//!!! do zamienienia !!!

// // navConfig.ts
// export type Role = "guest" | "user" | "trainer" | "admin";

// export type NavItem = {
//   label: string;
//   href: string;
//   roles?: Role[]; // jeśli brak, widoczne dla wszystkich
// };

// export const NAV_ITEMS: NavItem[] = [
//   { label: "Home", href: "/", roles: ["guest", "user", "trainer", "admin"] },
//   { label: "Menu", href: "/menu", roles: ["user", "trainer", "admin"] },
//   { label: "Training", href: "/training", roles: ["user", "trainer", "admin"] },
//   { label: "Schedule", href: "/schedule", roles: ["user", "trainer", "admin"] },
//   { label: "About", href: "/about", roles: ["guest"] },
//   { label: "Contact", href: "#contact", roles: ["guest"] },
// ];

// import { useMemo } from "react";
// import { useUserContext } from "../../../User/context";
// import { NAV_ITEMS, Role } from "./navConfig";

// export const useNavItems = () => {
//   const { logged, user } = useUserContext();

//   const role: Role = logged ? (user?.role as Role) ?? "user" : "guest";

//   return useMemo(
//     () => NAV_ITEMS.filter(
//       (item) => !item.roles || item.roles.includes(role)
//     ),
//     [role]
//   );
// };
