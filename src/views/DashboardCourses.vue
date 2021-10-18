<template>
  <div>
    <!-- Titulo administracion -->
    <h1 class="text-center ma-4 grey--text">
      Administración
      <v-btn @click="displayFormCreateCourse" color="primary"
        >Agregar nuevo curso</v-btn
      >
    </h1>
    <!-- Tabla con datos y edicion -->
    <TableCourses :courses="$store.state.courses.courses" />

    <!-- Lista con detalles / getters -->
    <div class="ma-6 pa-6">
      <v-card
        elevation="6"
        outlined
        width="100%"
        class="my-2 pa-2 border--purple"
      >
        <div class="text-left" color="purple">
          <v-icon color="purple">mdi-account-group</v-icon>
          <span class="color--purple">
            Cantidad total de alumnos permitidos:
            <strong color="purple">
              {{ $store.getters["courses/studentsAllowed"] }}
            </strong>
            alumnos.
          </span>
        </div>
      </v-card>
      <v-card
        elevation="6"
        outlined
        width="100%"
        class="my-2 pa-2 border--info"
      >
        <div>
          <v-icon color="info">mdi-account-multiple-check</v-icon>
          <span class="color--info">
            Cantidad total de alumnos inscritos:
            <strong>
              {{ $store.getters["courses/studentsEnrolled"] }}
            </strong>
            alumnos.
          </span>
        </div>
      </v-card>
      <v-card
        elevation="6"
        outlined
        width="100%"
        class="my-2 pa-2 border--error"
      >
        <div>
          <v-icon color="error"> mdi-account-clock</v-icon>
          <span class="color--error">
            Cantidad total de cupos restantes:<strong>
              {{
                $store.getters["courses/studentsAllowed"] -
                $store.getters["courses/studentsEnrolled"]
              }}
            </strong>
            alumnos.
          </span>
        </div>
      </v-card>
      <v-card
        elevation="6"
        outlined
        width="100%"
        class="my-2 pa-2 border--pink"
      >
        <div>
          <v-icon color="pink"> mdi-block-helper</v-icon>
          <span class="color--pink">
            Cantidad total de cursos terminados:
            <strong>
              {{ $store.getters["courses/coursesFinished"] }}
            </strong>
            cursos.
          </span>
        </div>
      </v-card>
      <v-card
        elevation="6"
        outlined
        width="100%"
        class="my-2 pa-2 border--brown"
      >
        <div>
          <v-icon color="brown"> mdi-bell-ring</v-icon>
          <span class="color--brown">
            Cantidad total de cursos activos:
            <strong>
              {{ $store.getters["courses/coursesActive"] }}
            </strong>
            cursos.
          </span>
        </div>
      </v-card>
      <v-card
        elevation="6"
        outlined
        width="100%"
        class="my-2 pa-2 border--orange"
      >
        <div>
          <v-icon color="orange"> mdi-bell-ring</v-icon>
          <span class="color--orange">
            Cantidad total de cursos:
            <strong>
              {{ $store.getters["courses/coursesAmount"] }}
            </strong>
            cursos.
          </span>
        </div>
      </v-card>
    </div>

    <!-- Dialogo para crear -->
    <v-dialog v-model="dialogCreate" width="500">
      <v-card class="px-5" elevation="2">
        <v-card-title>Ingrese los datos del nuevo curso</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="sendFormCreateCourse" ref="formCreateCourse">
            <!-- Nombre: -->
            <v-text-field
              v-model="course.nombre"
              label="Nombre"
              placeholder="Ingrese nombre curso"
              :rules="[required]"
            ></v-text-field>
            <!-- Descripcion curso -->
            <v-text-field
              v-model="course.descripcion"
              label="Descripción"
              placeholder="Ingrese descripcion curso"
              :rules="[required]"
            ></v-text-field>
            <!-- Cupos: -->
            <v-text-field
              v-model.number="course.cupos"
              type="number"
              label="Cupos"
              :rules="[required]"
            ></v-text-field>
            <!-- Inscritos: -->
            <v-text-field
              v-model.number="course.inscritos"
              type="number"
              label="Inscritos"
              :rules="[required]"
            ></v-text-field>
            <!-- Duracion: -->
            <v-text-field
              v-model="course.duracion"
              label="Duración. (Ej. formato: 1 mes)"
              placeholder="1 mes"
              :rules="[required]"
            ></v-text-field>
            <!-- Costo: -->
            <v-text-field
              v-model.number="course.costo"
              type="number"
              label="Costo"
              :rules="[required]"
            ></v-text-field>
            <!-- Estado: -->
            <v-switch v-model="course.estado" label="Estado"></v-switch>
            <!-- Fecha registro -->
            <v-text-field
              v-model="course.fechaderegistro"
              label="Fecha de registro (Formato: 11/11/2021)"
              placeholder="11/11/2021"
              :rules="[required]"
            ></v-text-field>
            <!-- Imagen: https://miro.medium.com/max/512/1*9U1toerFxB8aiFRreLxEUQ.png -->
            <v-text-field
              v-model="course.imagen"
              label="Imagen (agregar nueva)"
              :rules="[required]"
            ></v-text-field>
            <v-layout d-flex flex-wrap justify-space-around>
              <v-btn type="submit" color="success">Crear</v-btn>
              <v-btn type="button" @click="closeModalCreateCourse" color="error"
                >Cancelar</v-btn
              >
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="courseCreationSuccess" width="320">
      <v-card class="text-center pa-4">
        <v-card-text>Curso creado exitosamente </v-card-text>
        <v-btn
          @click="closeModalCreationSuccess"
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
import TableCourses from "./../components/Courses/TableCourses.vue";

export default {
  name: "DashboardCourses",
  components: {
    TableCourses,
  },
  data: () => ({
    allCourses: [],
    course: {
      nombre: "",
      cupos: 0,
      inscritos: 0,
      duracion: "",
      costo: 0,
      estado: false,
      imagen: "https://miro.medium.com/max/512/1*9U1toerFxB8aiFRreLxEUQ.png",
      fechaderegistro: "",
    },
    dialogCreate: false,
    courseCreationSuccess: false,
  }),
  mounted() {
    this.$store.dispatch("courses/getAllCourses");
  },
  methods: {
    displayFormCreateCourse() {
      this.dialogCreate = true;
    },
    sendFormCreateCourse() {
      if (this.$refs.formCreateCourse.validate()) {
        Firebase.firestore()
          .collection("courses")
          .add(this.course)
          .then(() => {
            this.$store.dispatch("courses/getAllCourses");
            this.dialogCreate = false;
            this.courseCreationSuccess = true;
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    required(value) {
      return !!value || "Este campo es obligatorio";
    },
    resetValidations() {
      this.$refs.formCreateCourse.resetValidation();
    },
    closeModalCreateCourse() {
      this.dialogCreate = false;
    },
    closeModalCreationSuccess() {
      this.courseCreationSuccess = false;
      this.course = {};
      this.resetValidations();
    },
  },
};
</script>

<style>
.color--purple {
  color: purple;
}
.border--purple {
  border: 2px solid purple !important;
}
.color--info {
  color: #2196f3;
}
.border--info {
  border: 2px solid #2196f3 !important;
}
.color--brown {
  color: brown;
}
.border--brown {
  border: 2px solid brown !important;
}
.color--pink {
  color: hotpink;
}
.border--pink {
  border: 2px solid hotpink !important;
}
.color--error {
  color: #ff5252;
}
.border--error {
  border: 2px solid #ff5252 !important;
}
.color--orange {
  color: #fb8c00;
}
.border--orange {
  border: 2px solid #fb8c00 !important;
}
</style>