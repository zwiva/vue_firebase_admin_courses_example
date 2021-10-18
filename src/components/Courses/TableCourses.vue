<template>
  <div class="pa-6">
    <!-- Tabla resumen -->
    <v-data-table
      dense
      :headers="headers"
      :items="courses"
      item-key="name"
      class="elevation-1"
    >
      <template v-slot:[`item.costo`]="{ item }">
        <v-chip color="success">${{ item.costo.toLocaleString() }}</v-chip>
      </template>

      <template v-slot:[`item.estado`]="{ item }">
        <v-chip :color="item.estado ? 'info' : 'grey'">
          {{ item.estado ? "Si" : "No" }}
        </v-chip>
      </template>

      <template v-slot:[`item.fechaderegistro`]="{ item }">
        <v-chip color="success">
          {{ item.fechaderegistro ? item.fechaderegistro : "Sin información" }}
        </v-chip>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <div>
          <v-btn icon @click="goToEditFormCourse(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteCourse(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <!-- Dialogo para eliminar -->
    <v-dialog v-model="dialogDelete" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">Atención:</v-card-title>
        <v-card-text class="mt-2">Elemento borrado existosamente</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
 
          <v-btn color="primary" text @click="stayInDashboard">
            Ok.
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Firebase from "firebase";
export default {
  name: "TableCourses",
  data: () => ({
    headers: [
      { text: "Curso", value: "nombre" },
      { text: "Cupos", value: "cupos" },
      { text: "Inscritos", value: "inscritos" },
      { text: "Duración", value: "duracion" },
      { text: "Costo", value: "costo" },
      { text: "Terminado", value: "estado" },
      { text: "Fecha de registro", value: "fechaderegistro" },
      { text: "Acciones", value: "actions" },
    ],
    dialogDelete: false,
  }),
  props: {
    courses: { type: Array, require: true },
  },
  methods: {
    goToEditFormCourse(item) {
      this.$router.push(`/cursos/${item.id}`);
    },
    openDialogDeleteCourse() {
      this.dialogDelete = true;
    },
    stayInDashboard() {
      this.dialogDelete = false;
    },
    deleteCourse(item) {
      this.dialogDelete = true
      Firebase.firestore()
        .collection("courses")
        .doc(item.id)
        .delete()
        .then(() => {
          this.$store.dispatch("courses/deleteCourse", item.id);
          this.$store.dispatch("courses/getAllCourses");
        });
    },
  },
};
</script>
