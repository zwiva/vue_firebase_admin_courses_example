<template>
  <div>
    <!-- Titulo administracion -->
    <h1 class="text-center ma-4 grey--text">
      Administración
      <v-btn @click="addNewCourse">Agregar nuevo curso</v-btn>
    </h1>
    <!-- Tabla con datos y edicion -->

    <TableCourses :courses="allCourses" />

    <!-- Lista con detalles / getters -->
    <div>
      <div><p>Cantidad total de alumnos permitidos</p></div>
      <div><p>Cantidad total de alumnos inscritos</p></div>
      <div><p>Cantidad total de cupos restantes</p></div>
      <div><p>Cantidad total de cursos terminados</p></div>
      <div><p>Cantidad total de cursos activos</p></div>
      <div><p>Cantidad total de cursos</p></div>
    </div>

    <!-- Dialogo para crear -->
    <v-dialog v-model="dialog" width="500">
      <v-form @submit.prevent="editCourses" ref="editingCourses">
        <v-text-field v-model="course.nombre" label="Nombre"></v-text-field>
        <v-text-field
          v-model.number="course.cupos"
          type="number"
          label="Cupos"
        ></v-text-field>
        <v-text-field
          v-model.number="course.inscritos"
          type="number"
          label="Inscritos"
        ></v-text-field>
        <v-text-field v-model="course.duracion" label="Duración"></v-text-field>
        <v-text-field
          v-model.number="course.costo"
          type="number"
          label="Costo"
        ></v-text-field>
        <v-switch v-model="course.estado" label="Estado"></v-switch>
        <v-btn type="submit" color="success">Guardar</v-btn>
      </v-form>
    </v-dialog>

    <!-- Dialogo para editar -->
    <v-dialog v-model="dialog" width="500">
      <v-form @submit.prevent="editCourses" ref="editingCourses">
        <v-text-field v-model="course.nombre" label="Nombre"></v-text-field>
        <v-text-field
          v-model.number="course.cupos"
          type="number"
          label="Cupos"
        ></v-text-field>
        <v-text-field
          v-model.number="course.inscritos"
          type="number"
          label="Inscritos"
        ></v-text-field>
        <v-text-field v-model="course.duracion" label="Duración"></v-text-field>
        <v-text-field
          v-model.number="course.costo"
          type="number"
          label="Costo"
        ></v-text-field>
        <v-switch v-model="course.estado" label="Estado"></v-switch>
        <v-btn type="submit" color="success">Guardar</v-btn>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import Firebase from "firebase";
import TableCourses from "./../components/Courses/TableCourses.vue";

export default {
  name: "DashboardCourses",
  components: {
    TableCourses,
  },
  data: () => ({
    allCourses: [],
    course: {
      nombre: null,
      cupos: null,
      inscritos: null,
      duracion: null,
      costo: null,
      estado: false,
    },
    dialog: false,
  }),
  mounted() {
    Firebase.firestore()
      .collection("courses")
      .get()
      .then((documents) => {
        documents.forEach((document) =>
          this.allCourses.push({ id: document.id, ...document.data() })
        );
      });
  },
  methods: {
    editCourses() {
      console.log("editando curso");
    },
    addNewCourse() {
      console.log("desplegar modal para agregar nuevo curso");
    },
  },
};
</script>
