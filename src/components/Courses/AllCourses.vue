<template>
  <div>
    <v-row d-flex flex-wrap class="justify-center">
      <div v-for="course in courses" :key="course.id">
        <v-card outlined width="300px" class="my-3 mx-3">
          <div class="text-center">
            <img :src="course.imagen" alt="" height="185" class="my-4" />
          </div>

          <div style="background-color: #e1dfdf">
            <div class="mx-6 px-6 py-4">
              <div>
                <h4>{{ course.nombre }}</h4>
              </div>
              <div>
                <h5>Informacion</h5>
              </div>
            </div>

            <v-timeline align-top dense class="mx-3 ">
              <v-timeline-item color="purple" small>
                <div>
                  <span
                    >Costo: <strong>{{ course.costo }}</strong></span
                  >
                </div>
                <div>
                  <span>Duracion: {{ course.duracion }}</span>
                </div>
              </v-timeline-item>

              <v-timeline-item color="green" small>
                <div>
                  <span
                    >Cupos: <strong>{{ course.cupos }}</strong></span
                  >
                </div>
                <div>
                  <span>Completado: {{ course.estado ? "SI" : "NO" }}</span>
                </div>
              </v-timeline-item>

              <v-timeline-item color="purple" small>
                <div>
                  <span><strong>Fecha de registro:</strong></span>
                </div>
                <div>
                  <span>{{ course.fechaderegistro }}</span>
                </div>
              </v-timeline-item>

              <v-timeline-item color="green" small>
                <div>
                  <span><strong>Descripcion:</strong> </span>
                </div>
                <div>
                  <span> {{ course.descripcion }}</span>
                </div>
              </v-timeline-item>
            </v-timeline>
          </div>
        </v-card>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "CourseDetail",

  props: {
    courses: { type: Array, require: true },
  },
};
</script>
