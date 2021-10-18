<template>
  <div class="text-center grey--text ma-6">
    <h1>Editando curso id: {{ $route.params.id }}</h1>

    <v-form @submit.prevent="saveEdition" ref="editForm">
      <!-- Nombre -->
      <v-text-field v-model="course.nombre" label="Nombre"></v-text-field>
      <!-- Descripcion -->
      <v-text-field
        v-model="course.descripcion"
        label="Descripción"
      ></v-text-field>
      <!-- Cupos -->
      <v-text-field
        v-model.number="course.cupos"
        type="number"
        label="Cupos"
      ></v-text-field>
      <!-- Inscritos -->
      <v-text-field
        v-model.number="course.inscritos"
        type="number"
        label="Inscritos"
      ></v-text-field>
      <!-- Duración -->
      <v-text-field v-model="course.duracion" label="Duración"></v-text-field>
      <!-- Costo -->
      <v-text-field
        v-model.number="course.costo"
        type="number"
        label="Costo"
      ></v-text-field>
      <!-- Estado -->
      <v-switch v-model="course.estado" label="Estado"></v-switch>
      <!-- Fecha registro -->
      <v-text-field
        v-model="course.fechaderegistro"
        label="Fecha de registro"
      ></v-text-field>
      <!-- Imagen -->
      <v-text-field v-model="course.imagen" label="Url Imagen"></v-text-field>
      <v-btn type="submit" color="success">Guardar</v-btn>
    </v-form>
  </div>
</template>

<script>
import Firebase from "firebase";

export default {
  data: () => ({
    course: {},
  }),
  methods: {
    saveEdition() {
      if (this.$refs.editForm.validate()) {
        Firebase.firestore()
          .collection("courses")
          .doc(this.course.id)
          .update(this.course)
          .then(() => {
            
            this.$router.push("/cursos");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    Firebase.firestore()
      .collection("courses")
      .doc(to.params.id)
      .get()
      .then((document) => {
        next((vm) => {
          vm.course = { id: document.id, ...document.data() };
        });
      });
  },
};
</script>

<style>
</style>