<template>
  <div>
    <h1>
      aca va la tabla crud
      <v-btn @click="addNewCourse">Agregar nuevo curso</v-btn>
    </h1>
    <v-dialog>
      dialogo para editar
      <v-form @submit.prevent="editCourses" ref="formulario">
        <v-text-field
          :disabled="loading"
          v-model="course.nombre"
          label="Nombre"
        ></v-text-field>
        <v-text-field
          :disabled="loading"
          v-model.number="course.cupos"
          type="number"
          label="Cupos"
        ></v-text-field>
        <v-text-field
          :disabled="loading"
          v-model.number="course.inscritos"
          type="number"
          label="Inscritos"
        ></v-text-field>
        <v-text-field
          :disabled="loading"
          v-model="course.duracion"
          label="Duración"
        ></v-text-field>
        <v-text-field
          :disabled="loading"
          v-model.number="course.costo"
          type="number"
          label="Costo"
        ></v-text-field>
        <v-switch
          :disabled="loading"
          v-model="course.estado"
          label="Estado"
        ></v-switch>

        <v-btn type="submit" color="success" :loading="loading">Guardar</v-btn>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DashboardCourses",
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

<style>
</style>