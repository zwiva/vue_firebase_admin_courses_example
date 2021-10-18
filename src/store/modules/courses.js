import Firebase from "firebase";

export const coursesModule = {
  namespaced: true,
  state: {
    courses: [],
  },
  getters: {
    // shopCartTotalAmount(state) {
    //   return state.inCartProducts.reduce((acum, product) => {
    //     acum += product.price * (1 - product.discount / 100) * product.quantity;
    //     return acum;
    //   }, 0);
    // },

    studentsAllowed(state) {
      return state.courses.reduce((acum, course) => {
        acum += course.cupos;
        return acum;
      }, 0);
    },
    studentsEnrolled(state) {
      return state.courses.reduce((acum, course) => {
        acum += course.inscritos;
        return acum;
      }, 0);
    },
    coursesFinished(state) {
      return state.courses.reduce((acum, course) => {
        if (course.estado) {
          acum += 1;
        }
        return acum;
      }, 0);
    },
    coursesActive(state) {
      return state.courses.reduce((acum, course) => {
        if (course.estado === false) {
          acum += 1;
        }
        return acum;
      }, 0);
    },
    coursesAmount(state){
      // console.log(typeof state.courses)
      return state.courses.length;
    }
  },
  mutations: {
    GET_ALL_COURSES(state, courses) {
      state.courses = courses;
      console.log("state.courses", state.courses);
    },
    CREATE_COURSE(state, newCourse) {
      state.courses.push(newCourse);
      // console.log('state.courses', state.courses)
    },
    DELETE_COURSE(state, courseid) {
      const courseToRemove = state.courses.filter(
        (course) => course.id === courseid
      );
      const indexOfCourse = state.courses.indexOf(courseToRemove[0]);

      state.courses.splice(indexOfCourse, 1);
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
      context.commit("CREATE_COURSE", course);
    },
    deleteCourse(context, course) {
      context.commit("DELETE_COURSE", course.id);
    },
  },
};
