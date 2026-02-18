// src/hooks/useStudents.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { studentApi } from "../api/studentApi";

const QUERY_KEYS = {
  myStudents: ["myStudents"],
  availableStudents: userId => ["availableStudents", userId],
};

export const useStudents = userId => {
  const queryClient = useQueryClient();

  // Pobierz moich studentów
  const myStudentsQuery = useQuery({
    queryKey: QUERY_KEYS.myStudents,
    queryFn: () => studentApi.getMyStudents(),
    enabled: !!userId, // Tylko gdy userId istnieje
  });

  // Pobierz dostępnych studentów
  const availableStudentsQuery = useQuery({
    queryKey: QUERY_KEYS.availableStudents(userId),
    queryFn: () => studentApi.getAvailableStudents(userId),
    enabled: !!userId, // Tylko gdy userId istnieje
  });

  // Mutacja: Dodaj studenta
  const addStudentMutation = useMutation({
    mutationFn: studentId => studentApi.addStudent(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myStudents });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.availableStudents(userId),
      });
    },
  });

  // Mutacja: Usuń studenta
  const removeStudentMutation = useMutation({
    mutationFn: studentId => studentApi.removeStudent(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myStudents });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.availableStudents(userId),
      });
    },
  });

  // Mutacja: Utwórz nowego studenta
  const createStudentMutation = useMutation({
    mutationFn: data => studentApi.createStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myStudents });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.availableStudents(userId),
      });
    },
  });

  // Wrapper dla addStudent z obsługą błędów
  const addStudentToTrainer = async studentId => {
    try {
      await addStudentMutation.mutateAsync(studentId);
      return { success: true };
    } catch (err) {
      const errorMsg = err.message || "Błąd przy dodawaniu studenta";
      return { success: false, error: errorMsg };
    }
  };

  // Wrapper dla removeStudent z obsługą błędów
  const removeStudentFromTrainer = async studentId => {
    try {
      await removeStudentMutation.mutateAsync(studentId);
      return { success: true };
    } catch (err) {
      const errorMsg = err.message || "Błąd przy usuwaniu studenta";
      return { success: false, error: errorMsg };
    }
  };

  // Wrapper dla createStudent z obsługą błędów
  const createStudentToTrainer = async (data, onSuccess) => {
    try {
      const result = await createStudentMutation.mutateAsync(data);
      if (onSuccess) {
        onSuccess(result);
      }
      return result;
    } catch (err) {
      const errorMsg = err.message || "Błąd przy dodawaniu studenta";
      return { success: false, error: errorMsg };
    }
  };

  // Określ loading i error
  const loading = myStudentsQuery.isLoading || availableStudentsQuery.isLoading;
  const error =
    myStudentsQuery.error?.message ||
    availableStudentsQuery.error?.message ||
    null;

  return {
    myStudents: myStudentsQuery.data?.results || [],
    availableStudents: availableStudentsQuery.data?.results || [],
    loading,
    error,
    addStudentToTrainer,
    removeStudentFromTrainer,
    createStudentToTrainer,
    refetch: async () => {
      await queryClient.refetchQueries({ queryKey: QUERY_KEYS.myStudents });
      await queryClient.refetchQueries({
        queryKey: QUERY_KEYS.availableStudents(userId),
      });
    },
  };
};
