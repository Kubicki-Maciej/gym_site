import api from "./client";

export const studentApi = {
  // Pobierz dostępnych studentów
  getAvailableStudents: async userId => {
    return api.get(`user/users/${userId}/available_students/`);
  },

  // Pobierz moich studentów
  getMyStudents: async () => {
    return api.get("user/users/my_students/");
  },

  // Dodaj studenta
  addStudent: async studentId => {
    return api.post("user/users/add_student/", {
      student_id: studentId,
    });
  },

  // Usuń studenta
  removeStudent: async studentId => {
    return api.post("user/users/remove_student/", {
      student_id: studentId,
    });
  },

  createStudent: async data => {
    return api.post("user/trainer/create_student", data);
  },
};
