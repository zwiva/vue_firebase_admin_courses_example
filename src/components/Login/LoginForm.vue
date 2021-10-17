<template>
  <v-form @submit.prevent="sendForm" ref="loginForm">
    <v-text-field
      outlined
      label="correo electrónico"
      type="email"
      v-model="form.email"
      :rules="[required]"
    ></v-text-field>
    <v-text-field
      outlined
      label="contraseña"
      type="password"
      v-model="form.password"
      :rules="[required]"
    >
    </v-text-field>

    <v-layout d-flex flex-wrap justify-space-around>
      <v-btn color="success" type="submit" class="my-3">Inicia sesión</v-btn>
      <v-btn color="amber" type="button" @click="resetValidations" class="my-3">Limpia Validacion</v-btn>
      <v-btn color="error" type="reset" @click="resetForm" class="my-3">Limpia formulario</v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import Firebase from "firebase";
export default {
  name: "LoginForm",
  data: () => ({
    form: {
      email: "",
      password: "",
    },
  }),
  methods: {
    async sendForm() {
      if (this.$refs.loginForm.validate()) {
        try {
          await Firebase.auth().signInWithEmailAndPassword(
            this.form.email,
            this.form.password
          );
          this.$store.dispatch(
            "session/activateSession",
            Firebase.auth().currentUser
          );
          this.$emit("success");
          this.$router.push("/home");
        } catch (e) {
          console.log("error: ", e);
        }
      }
    },
    resetValidations() {
      this.$refs.loginForm.resetValidation();
    },
    resetForm() {
      this.$refs.loginForm.reset();
    },
    required(value) {
      return !!value || "Campo obligatorio, por favor ingresar credenciales.";
    },
  },
};
</script>

<style>
</style>