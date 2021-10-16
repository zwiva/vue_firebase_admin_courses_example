<template>
  <div>
    <h1>home</h1>
    <pre> {{ courses }}</pre>
  </div>
</template>

<script>
import Firebase from "firebase";
export default {
  name: "Home",
  components: {},
  data: () => ({
    courses: [],
    drawer: null,
  }),
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
