<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="$emit('toggleDrawer')"></v-app-bar-nav-icon>
    <div class="d-flex align-center">Cursos AlfaWeb</div>
    <v-spacer></v-spacer>
    <Logout v-if="this.$store.state.session.user" />
    <LoginButton v-else />
  </v-app-bar>
</template>

<script>
import LoginButton from "../Login/LoginButton.vue";
import Logout from "../Login/Logout.vue";
export default {
  name: "Navbar",
  components: { LoginButton, Logout },
  updated() {
    console.log("updated", this.$store.state.session.user);
  },
};
</script>
