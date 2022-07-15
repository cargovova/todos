<template>
  <v-app>
    <v-app-bar app clipped-left dense>
      <v-spacer></v-spacer>
      TODOS
      <v-spacer></v-spacer>
    </v-app-bar>
    <left-nav-menu />
    <v-main>
      <router-view />
    </v-main>
    <v-snackbar v-model="snackbar.show" :timeout="1500" :color="snackbar.color">
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script>
import LeftNavMenu from './components/LeftNavMenu.vue'
import { mapMutations, mapGetters } from 'vuex'

export default {
  components: { LeftNavMenu },
  name: 'App',
  methods: {
    ...mapMutations(['SET_TODOS']),
  },
  created() {
    const storredTodos = JSON.parse(localStorage.getItem('todos'))
    if (storredTodos) {
      this.SET_TODOS(storredTodos.todos)
    }
  },
  computed: {
    ...mapGetters(['snackbar']),
  },
}
</script>
