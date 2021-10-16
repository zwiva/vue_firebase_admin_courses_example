<template>
  <v-app>
    <Navbar @toggleDrawer="drawer = !drawer" />
    <Sidebar v-model="drawer" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: null,
  }),
  components: {
    Navbar: () => import("./components/App/Navbar.vue"),
    Sidebar: () => import("./components/App/Sidebar.vue"),
  },
};
</script>
