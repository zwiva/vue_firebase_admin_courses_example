export const sessionModule = {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, newUser) {
      state.user = newUser;
      // console.log('state.user', state.user)
    },
  },
  actions: {
    configurateUser(context, user) {
      context.commit("SET_USER", user);
      // console.log('user in action', user)
    },
  },
};
