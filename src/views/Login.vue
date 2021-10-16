<template>
  <div class="pa-5 mx-lg-auto">
    <div class="grey--text my-2">Ingresa tus datos para iniciar sesión</div>
    <LoginForm @success="dialog = false" />
  </div>
</template>
<script>
export default {
  name: "Login",
  components: {
    LoginForm: () => import("./../components/Login/LoginForm.vue"),
  },
};
</script>

