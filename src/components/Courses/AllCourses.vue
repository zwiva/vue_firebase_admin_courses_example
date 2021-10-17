<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <div v-for="course in courses" :key="course.id">
        <v-card outlined shaped> {{ course.id }} </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "CourseDetail",

  props: {
    courses: { type: Array, require: true },
  },
};
</script>

<style>
</style>