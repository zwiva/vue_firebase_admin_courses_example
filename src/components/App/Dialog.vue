<template>
  <v-dialog v-model="dialog" width="720">
    <template>
      <!-- #activator="{ on }" -->
  <!-- <v-btn text depressed v-on="on"> -->
      <h1>aaaa</h1>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: "Dialog",
  data: () => ({
    dialog: false,
  }),
};
</script>
