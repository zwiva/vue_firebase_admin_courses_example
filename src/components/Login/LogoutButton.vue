<template>
  <div>

    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            depressed
            dark
            @click="logOutSession"
            v-bind="attrs"
            v-on="on"
          >
            {{
              $store.state.session.user
                ? $store.state.session.user.email
                : "no existe"
            }}
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">Atención:</v-card-title>
          <v-card-text class="mt-2">Esta cerrando su sesión.</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="stayInSession">
              No, me quedo.
            </v-btn>
            <v-btn color="primary" text @click="confirmLogOutSession">
              Si, acepto.
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-dialog>
    </div>

  </div>
</template>

<script>
import Firebase from "firebase";

export default {
  name: "LogoutButton",
  data: () => ({
    dialog: false,
  }),
  methods: {
    logOutSession() {
      Firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          console.log("usuario quiere cerrar sesion");
        }
      });
      this.dialog = true;
    },
    confirmLogOutSession() {
      Firebase.auth()
        .signOut()
        .then(() => {
          console.log("cierre de sesion");
          this.$router.push("/login");
          this.$store.state.session.user = null;
        })
        .catch((error) => {
          console.log(error);
        });
      this.dialog = false;
    },
    stayInSession() {
      Firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          console.log("mantiene sesion abierta");
        }
      });
      this.dialog = false;
    },
  },
};
</script>

