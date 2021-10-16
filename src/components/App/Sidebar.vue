<template>
  <v-navigation-drawer :value="value" @input="$emit('input', $event)" app>
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="https://freesvgdesigns.com/wp-content/uploads/2019/08/01028-NEW.jpg" height="40"></v-img>
      </v-list-item-avatar>
      <v-list-item-title>Bienvenid@</v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  data: () => ({
    items: [
      { title: "Cursos", icon: "mdi-apps", to: "/home" },
      { title: "Administrar cursos", icon: "mdi-table-edit", to: "/administrarcursos" },
    ],
  }),
  props: ["value"],
};
</script>

<style>
</style>