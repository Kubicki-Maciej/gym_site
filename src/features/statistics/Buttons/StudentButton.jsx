import { IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import useSelectedUser from "hooks/useSelectedUser";

export default function StudentButton({ student }) {
  const navigate = useNavigate();

  const { setSelectedUser, setSelectedObjectUser } = useSelectedUser();

  const handleViewProfile = () => {
    setSelectedUser(student.id);
    setSelectedObjectUser(student);
    navigate(`/student/profile/`, {
      state: { student: student },
    });
  };

  return (
    <IconButton
      size="small"
      color="primary"
      onClick={handleViewProfile}
      title="Wyświetl profil"
    >
      <PersonIcon />
    </IconButton>
  );
}
