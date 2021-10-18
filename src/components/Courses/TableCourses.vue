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

          <v-btn icon @click="showDialogDeleteConfirmation(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <!-- Modal para confirmar eliminacion -->
    <v-dialog v-model="dialogDeleteConfirmation" width="320">
      <v-card class="text-center pa-4">
        <v-card-text>Confirme que desee eliminar el curso</v-card-text>
        <div d-flex flex-wrap>
          <v-btn
            @click="runDeleteCourse()"
            color="warning"
            class="text-center mr-1"
            >Si, eliminar</v-btn
          >
          <v-btn @click="cancelDeleteCourse" color="primary" class="text-center"
            >No, regresar</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
    <!-- Modal para avisar eliminacion -->
    <v-dialog v-model="dialogDeleteSuccessfull" width="320">
      <v-card class="text-center pa-4">
        <v-card-text>Curso aliminado exitosamente </v-card-text>
        <v-btn
          @click="closeDialogDeleteSuccessfull"
          color="primary"
          class="text-center"
          >ok</v-btn
        >
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import Firebase from "firebase";
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

    dialogDeleteConfirmation: false,
    dialogDeleteSuccessfull: false,
  }),
  props: {
    courses: { type: Array, require: true },
  },
  methods: {
    goToEditFormCourse(item) {
      this.$router.push(`/cursos/${item.id}`);
    },
    showDialogDeleteConfirmation(item) {
      this.dialogDeleteConfirmation = true;
      this.$store.state.courses.courseToDelete = item;
      // console.log(this.$store.state.courses.courseToDelete)
    },
    cancelDeleteCourse() {
      this.dialogDeleteConfirmation = false;
    },
    runDeleteCourse() {
      console.log("run delete course");
      this.$store.dispatch("courses/deleteCourse");
      this.dialogDeleteConfirmation = false;
      this.dialogDeleteSuccessfull = true;

      // console.log(this.$store.state.courses.courseToDelete)
    },
    closeDeleteDialogConfirmation() {
      this.deleteDialogConfirmation = false;
    },
    closeDialogDeleteSuccessfull(){
      this.dialogDeleteSuccessfull = false;
    }
  },
};
</script>
