<template>
  <div>
    <v-sheet class="ma-6">
      <h1 class="grey--text">
        Lista de cursos <v-btn @click="addNewCourse">Agregar nuevo curso</v-btn>
      </h1>
      <AllCourses :courses="courses" />
      <!-- <pre> {{ courses }}</pre> -->
    </v-sheet>
  </div>
</template>

<script>
import Firebase from "firebase";
import AllCourses from "../components/Courses/AllCourses.vue";

export default {
  name: "Home",
  components: { AllCourses },
  data: () => ({
    courses: [],
    drawer: null,
  }),
  methods: {
    addNewCourse() {
      console.log("desplegar modal para agregar nuevo curso");
    },
  },
  mounted() {
    Firebase.firestore()
      .collection("courses")
      .get()
      .then((documents) => {
        documents.forEach((document) =>
          this.courses.push({ id: document.id, ...document.data() })
        );
      });
  },
};
</script>
