import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUserContext } from "../components/User/context";
import useTraining from "hooks/useTraining";

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

export const ProtectedTrainingRoute = ({
  children,
  requireTrainer = false,
}) => {
  const { logged, user } = useUserContext();
  const { id: trainingId } = useParams();
  const { checkUserTrainingAccess } = useTraining();

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const checkAccess = async () => {
      const isTrainer = user?.is_user_trainer === true;

      if (requireTrainer && !trainingId) {
        setStatus(isTrainer ? "granted" : "denied");
        return;
      }

      if (isTrainer) {
        setStatus("granted");
        return;
      }

      if (trainingId) {
        try {
          const result = await checkUserTrainingAccess(user.id, trainingId);
          setStatus(result?.has_access ? "granted" : "denied");
        } catch (error) {
          setStatus("denied");
        }
      } else {
        setStatus("granted");
      }
    };

    if (logged && user) {
      checkAccess();
    } else {
      setStatus("denied");
    }
  }, [logged, user, trainingId, requireTrainer, checkUserTrainingAccess]);

  if (!logged) {
    return <Navigate to="/login" replace />;
  }

  if (status === "loading") {
    return <div>Sprawdzanie dostępu...</div>;
  }

  if (status === "denied") {
    return <Navigate to="/403" replace />;
  }

  return children;
};
