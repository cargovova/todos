<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-spacer></v-spacer>
      TODOS
      <v-spacer></v-spacer>
    </v-app-bar>
    <left-nav-menu />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import LeftNavMenu from './components/LeftNavMenu.vue'
export default {
  components: { LeftNavMenu },
  name: 'App',
  data: () => ({
    //
  }),
}
</script>
