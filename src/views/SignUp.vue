<template>
  <div class="pa-5 mx-lg-auto">
    <div class="grey--text my-2">Ingrese sus datos para registrarse e iniciar sesión:</div>
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
        <v-btn color="info" type="submit">Registrarse</v-btn>
        <v-btn color="amber" type="button" @click="resetValidations"
          >Limpia Validacion</v-btn
        >
        <v-btn color="error" type="reset" @click="resetForm"
          >Limpia formulario</v-btn
        >
      </v-layout>
    </v-form>
  </div>
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
      if (this.$refs.registerForm.validate()) {
        try {
          await Firebase.auth()
            .createUserWithEmailAndPassword(this.form.email, this.form.password)
            .catch((error) => {
              console.log("error code", error.code);
              console.log("error message", error.message);
            });
          this.$store.dispatch(
            "session/registerNewUser",
            Firebase.auth().currentUser
          );
          await Firebase.auth().signInWithEmailAndPassword(
            this.form.email,
            this.form.password
          );
          this.$router.push("/home");
          this.$emit("success");
        } catch (e) {
          console.log("error: ", e);
        }
      }
    },
    resetValidations() {
      this.$refs.registerForm.resetValidation();
    },
    resetForm() {
      this.$refs.registerForm.reset();
    },
    required(value) {
      return !!value || "Campo obligatorio, por favor ingresar credenciales.";
    },
  },
};
</script>
