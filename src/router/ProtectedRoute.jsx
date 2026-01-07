import { Navigate } from "react-router-dom";
import { useUserContext } from "../components/User/context";

export const ProtectedRoute = ({ children, requireTrainer }) => {
  const { logged, user } = useUserContext();

  if (!logged) {
    return <Navigate to="/login" replace />;
  }

  if (requireTrainer && !user?.is_user_trainer) {
    return <Navigate to="/403" replace />;
  }

  return children;
};
