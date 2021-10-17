export const sessionModule = {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    SET_USER_SESSION(state, newUser) {
      state.user = newUser;
    },
    REGISTER_USER(state, newUser) {
      state.user = newUser;
      console.log("usuario registrado");
    },
  },
  actions: {
    activateSession(context, user) {
      context.commit("SET_USER_SESSION", user);
    },
    registerNewUser(context, user) {
      context.commit("REGISTER_USER", user);
    },
  },
};
