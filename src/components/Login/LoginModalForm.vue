<template>
  <v-dialog v-model="dialog" width="720">
    <template #activator="{ on }">
      <v-btn text depressed v-on="on">
        Iniciar Sesion
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title> Ingresa tus datos para iniciar sesión </v-card-title>
      <v-card-text>
        <LoginForm @success="dialog = false" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: { LoginForm: () => import("./LoginForm.vue") },
  data: () => ({
    dialog: false,
  }),
};
</script>

<style>
</style>