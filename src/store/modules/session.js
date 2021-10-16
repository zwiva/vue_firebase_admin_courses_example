export const sessionModule = {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    SET_USER_SESSION(state, newUser) {
      state.user = newUser;
      // console.log('state.user', state.user)
    },
    REGISTER_USER(state) {
      console.log("r"), state;
    },
  },
  actions: {
    activateSession(context, user) {
      context.commit("SET_USER_SESSION", user);
      // console.log('user in action', user)
    },
    registerNewUser(context, user) {
      context.commit("REGISTER_USER", user);


      // codigo firestore para registrar nuevo usuario
    }
  },
};