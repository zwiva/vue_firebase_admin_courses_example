<template>
  <v-btn text depressed @click="goToLogin">
    Iniciar Sesion
    <v-icon>mdi-login</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "LoginButton",
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>