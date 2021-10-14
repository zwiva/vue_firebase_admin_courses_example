<template>
  <v-app>
    <Navbar @toggleDrawer="drawer = !drawer" />
    <Sidebar v-model="drawer"/>
    <v-main>
      <pre> {{ courses }}</pre>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Firebase from "firebase";
export default {
  name: "App",

  data: () => ({
    courses: [],
    drawer: null,
  }),
  components: {
    Navbar: () => import("./components/App/Navbar.vue"),
    Sidebar: () => import("./components/App/Sidebar.vue"),
  },
  mounted() {
    Firebase.firestore()
      .collection("courses")
      .get()
      .then((documents) => {
        documents.forEach((document) =>
          this.courses.push({ id: document.id, ...document.data() })
        );
      });
  },
};
</script>
