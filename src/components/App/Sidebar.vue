<template>
  <v-navigation-drawer :value="value" @input="$emit('input', $event)" app>
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
      </v-list-item-avatar>
      <v-list-item-title>Linda Leider</v-list-item-title>
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
  data: () => ({
    items: [
      { title: "Inicio", icon: "mdi-home", to: "/home" },
      { title: "Cursos", icon: "mdi-apps", to: "/courses" },
    ],
  }),
  props: ["value"],
};
</script>

<style>
</style>