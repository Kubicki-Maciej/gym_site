import { useUserContext } from "../User/context.jsx";
import AppRoutes from "../../router/AppRoutes.jsx";

export default function Section() {
  const { logged } = useUserContext();
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <AppRoutes />
    </div>
  );
}
