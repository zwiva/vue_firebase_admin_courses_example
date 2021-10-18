<template>
  <div>
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
        <v-btn
          color="amber"
          type="button"
          @click="resetValidations"
          class="my-3"
          >Limpia Validacion</v-btn
        >
        <v-btn color="error" type="reset" @click="resetForm" class="my-3"
          >Limpia formulario</v-btn
        >
      </v-layout>
    </v-form>

    <div class="text-center">
      <v-dialog v-model="dialog" width="550">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">Hola</v-card-title>
          <v-card-text class="mt-4 text-center">
            <strong>Bienvenido al sistema de administración de cursos.</strong>
          </v-card-text>
          <v-card-text class="text-center">
            <small class="">Será redirigo automáticamente... espere</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn color="primary" text @click="welcomeSession"> Ok. </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
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
    dialog: false,
  }),
  methods: {
    async sendForm() {
      if (this.$refs.loginForm.validate()) {
        try {
          this.dialog = true;
          await Firebase.auth().signInWithEmailAndPassword(
            this.form.email,
            this.form.password
          );

          this.$store.dispatch(
            "session/activateSession",
            Firebase.auth().currentUser
          );
          setTimeout(() => {
            this.dialog = false;
            this.$router.push("/cursos");
          }, 1500);
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
