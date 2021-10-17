<template>
  <div class="pa-5 mx-lg-auto">
    <div class="grey--text my-2">Ingrese sus datos para iniciar sesión:</div>
    <LoginForm @success="dialog = false" />

    <v-divider class="my-4"></v-divider>

    <p class="text-center">
      ¿No registrado?
      <v-btn @click="goToSignUp">Ir a registrarse</v-btn>
    </p>
  </div>
</template>
<script>
export default {
  name: "Login",
  methods: {
    goToSignUp() {
      this.$router.push("/registrarse");
    },
  },
  components: {
    LoginForm: () => import("./../components/Login/LoginForm.vue"),
  },
};
</script>

