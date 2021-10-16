<template>
  <v-form @submit.prevent="sendForm" ref="registerForm">
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
    <v-layout justify-space-around>
      <v-btn color="success" type="submit">Registrarse</v-btn>
      <v-btn color="amber" type="button" @click="resetValidations"
        >Limpia Validacion</v-btn
      >
      <v-btn color="error" type="reset" @click="resetForm"
        >Limpia formulario</v-btn
      >
    </v-layout>
  </v-form>
</template>

<script>
  import Firebase from "firebase";
export default {
name: "SignUp",
  data: () => ({
    form: {
      email: "",
      password: "",
    },
  }),
  methods: {
    async sendForm() {
      //ajustar para registro
      if (this.$refs.loginForm.validate()) {
        try {
          await Firebase.auth().signInWithEmailAndPassword( // en dez de auth debe haber otro
            this.form.email,
            this.form.password
          );
          this.$store.dispatch(
            "session/configurateUser",
            Firebase.auth().currentUser
          );
          this.$emit("success");
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
}
</script>

