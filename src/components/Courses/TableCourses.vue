<template>
  <div>
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
          <v-btn icon @click="goToEditCourse(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteCourse(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
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
  }),
  props: {
    courses: { type: Array, require: true },
  },
  methods: {
    goToEditCourse() {
      console.log("editando");
    },
    deleteCourse() {
      console.log("eliminando");
    },
  },
  // created() {
  //   console.log("courses", this.courses);
  // },
};
</script>
