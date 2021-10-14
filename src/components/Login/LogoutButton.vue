<template>
  <v-btn text depressed>
    {{
      $store.state.session.user ? $store.state.session.user.email : "no existe"
    }}
    <v-icon>mdi-logout</v-icon>
  </v-btn>
</template>

<script>
export default {};
</script>

<style>
</style>