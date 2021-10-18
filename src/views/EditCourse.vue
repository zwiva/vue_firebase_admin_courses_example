<template>
  <div class="text-center grey--text ma-6">
    <h1>Editando curso: {{ course.nombre }}</h1>
    <h2>id: {{ $route.params.id }}</h2>

    <v-form @submit.prevent="saveEdition" ref="editForm">
      <!-- Nombre -->
      <v-text-field
        v-model="course.nombre"
        label="Nombre"
        :rules="[required]"
      ></v-text-field>
      <!-- Descripcion -->
      <v-text-field
        v-model="course.descripcion"
        label="Descripción"
        :rules="[required]"
      ></v-text-field>
      <!-- Cupos -->
      <v-text-field
        v-model.number="course.cupos"
        type="number"
        label="Cupos"
        :rules="[required]"
      ></v-text-field>
      <!-- Inscritos -->
      <v-text-field
        v-model.number="course.inscritos"
        type="number"
        label="Inscritos"
        :rules="[required]"
      ></v-text-field>
      <!-- Duración -->
      <v-text-field
        v-model="course.duracion"
        label="Duración"
        :rules="[required]"
      ></v-text-field>
      <!-- Costo -->
      <v-text-field
        v-model.number="course.costo"
        type="number"
        label="Costo"
        :rules="[required]"
      ></v-text-field>
      <!-- Estado -->
      <v-switch v-model="course.estado" label="Estado"></v-switch>
      <!-- Fecha registro -->
      <v-text-field
        v-model="course.fechaderegistro"
        label="Fecha de registro"
        :rules="[required]"
      ></v-text-field>
      <!-- Imagen -->
      <v-text-field
        v-model="course.imagen"
        label="Url Imagen"
        :rules="[required]"
      ></v-text-field>

      <v-layout d-flex flex-wrap justify-space-around>
        <v-btn type="submit" color="success" class="my-3">Editar</v-btn>
        <v-btn color="error" type="reset" @click="resetForm" class="my-3"
          >Limpia formulario</v-btn
        >
        <v-btn
          color="amber"
          type="button"
          @click="resetValidations"
          class="my-3"
          >Limpia Validacion</v-btn
        >
        <v-btn
          color="info"
          type="button"
          class="my-3"
          @click="returnToDashboard"
          >REGRESAR</v-btn
        >
      </v-layout>
    </v-form>
    <v-dialog v-model="courseEditSuccess" width="320">
      <v-card class="text-center pa-4">
        <v-card-text>Curso editado exitosamente</v-card-text>
        <v-btn
          @click="closeModalEditionSuccess"
          color="primary"
          class="text-center"
          >ok</v-btn
        >
      </v-card>
    </v-dialog>
    <v-dialog v-model="courseEditFailed" width="320">
      <v-card class="text-center pa-4">
        <v-card-text>Cantidad de inscritos supera los cupos, por favor corregir.</v-card-text>
        <v-btn
          @click="closecourseEditFailed"
          color="primary"
          class="text-center"
          >ok</v-btn
        >
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Firebase from "firebase";

export default {
  data: () => ({
    course: {},
    courseEditSuccess: false,
    courseEditFailed: false,
  }),
  methods: {
    saveEdition() {
      if (this.$refs.editForm.validate()) {
        if (this.course.inscritos <= this.course.cupos) {
          Firebase.firestore()
            .collection("courses")
            .doc(this.course.id)
            .update(this.course)
            .then(() => {
              this.courseEditSuccess = true;
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          this.courseEditFailed = true;
        }
      }
    },
    resetValidations() {
      this.$refs.editForm.resetValidation();
    },
    resetForm() {
      this.$refs.editForm.reset();
    },
    required(value) {
      return !!value || "Campo obligatorio, por favor completar.";
    },
    returnToDashboard() {
      this.$router.push("/administrarcursos");
    },
    closeModalEditionSuccess() {
      this.$router.push("/administrarcursos");
      this.courseEditSuccess = false;
    },
    closecourseEditFailed() {
      this.courseEditFailed = false;
    }
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