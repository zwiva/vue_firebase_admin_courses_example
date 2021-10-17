import Firebase from "firebase";

export const coursesModule = {
  namespaced: true,
  state: {
    courses: [],
  },
  mutations: {
    GET_ALL_COURSES(state, courses) {
      state.courses = courses;
      console.log("state.courses", state.courses);
    },
    SET_COURSE(state, newCourse) {
      state.courses.push(newCourse);
      // console.log('state.courses', state.courses)
    },
  },
  actions: {
    getAllCourses(context) {
      console.log("traer todos los cursos para administrarlos");
      Firebase.firestore()
        .collection("courses")
        .get()
        .then((documents) => {
          const courses = [];
          documents.forEach((document) => {
            courses.push({ id: document.id, ...document.data() });
          });
          context.commit("GET_ALL_COURSES", courses);
        });
    },

    addNewCourse(context, course) {
      context.commit("SET_COURSE", course);
    },
  },
};
