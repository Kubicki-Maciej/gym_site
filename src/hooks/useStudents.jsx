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
    enabled: !!userId,
  });

  // Pobierz dostępnych studentów
  const availableStudentsQuery = useQuery({
    queryKey: QUERY_KEYS.availableStudents(userId),
    queryFn: () => studentApi.getAvailableStudents(userId),
    enabled: !!userId,
  });

  // Mutacje...
  const addStudentMutation = useMutation({
    mutationFn: studentId => studentApi.addStudent(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myStudents });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.availableStudents(userId),
      });
    },
  });

  const removeStudentMutation = useMutation({
    mutationFn: studentId => studentApi.removeStudent(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myStudents });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.availableStudents(userId),
      });
    },
  });

  const createStudentMutation = useMutation({
    mutationFn: data => studentApi.createStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myStudents });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.availableStudents(userId),
      });
    },
  });

  // Wrappery...
  const addStudentToTrainer = async studentId => {
    try {
      await addStudentMutation.mutateAsync(studentId);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.message || "Błąd przy dodawaniu studenta",
      };
    }
  };

  const removeStudentFromTrainer = async studentId => {
    try {
      await removeStudentMutation.mutateAsync(studentId);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.message || "Błąd przy usuwaniu studenta",
      };
    }
  };

  const createStudentToTrainer = async (data, onSuccess) => {
    try {
      const result = await createStudentMutation.mutateAsync(data);
      if (onSuccess) onSuccess(result);
      return result;
    } catch (err) {
      return {
        success: false,
        error: err.message || "Błąd przy dodawaniu studenta",
      };
    }
  };

  return {
    // Dane
    myStudents: myStudentsQuery.data?.results || [],
    availableStudents: availableStudentsQuery.data?.results || [],

    // ✅ Zwracaj właściwe wartości dla QueryStateHandler
    isLoading: myStudentsQuery.isLoading || availableStudentsQuery.isLoading,
    isError: myStudentsQuery.isError || availableStudentsQuery.isError,
    error: myStudentsQuery.error || availableStudentsQuery.error,

    // Akcje
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

export const useMyStudents = () => {
  const query = useQuery({
    queryKey: ["myStudents"],
    queryFn: () => studentApi.getMyStudents(),
  });

  return {
    myStudents: query.data?.results || query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
