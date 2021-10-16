export const coursesModule = {
  namespaced: true,
  state: {
    courses: [],
  },
  mutations: {
    SET_COURSE(state, newCourse) {
      state.courses = newCourse;
      // console.log('state.courses', state.courses)
    },
  },
  actions: {
    addNewCourse(context, course) {
      context.commit("SET_COURSE", course);
    },
  },
};
